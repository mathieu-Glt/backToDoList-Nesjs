import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    SetMetadata,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { AuthService } from './auth.service';
  import { Reflector } from '@nestjs/core';
  
  export const IS_PUBLIC_KEY = 'isPublic';
  export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
  
  declare module 'express' {
    export interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      @Inject(AuthService)
      private readonly authService: AuthService,
      private readonly reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) return true;
  
      const request = context.switchToHttp().getRequest<Request>();
      const response = context.switchToHttp().getResponse<Response>();
      const accessToken = this.extractTokenFromHeader(request);
  
      try {
        if (!accessToken) throw new UnauthorizedException('Token is required');
  
        const user = await this.authService.verifyAccessToken(accessToken);
        request['user'] = {
          id: user.id,
          email: user.email,
        };
        return true;
      } catch (error) {
        const refreshToken = this.extractRefreshTokenFromHeader(request);
        if (!refreshToken)
          throw new UnauthorizedException('Refresh token is required');
  
        try {
          const result = await this.authService.refreshTokens({ refreshToken });
  
          response.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          response.setHeader('Authorization', `Bearer ${result.accessToken}`);
  
          request['user'] = {
            id: result.id,
            email: result.email,
          };
          return true;
        } catch {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  
    private extractRefreshTokenFromHeader(request: Request): string | undefined {
      return request.cookies?.refreshToken;
    }
  }