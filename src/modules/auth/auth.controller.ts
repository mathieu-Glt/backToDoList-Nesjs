import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signUp.dto';
import { AuthResponseDTO } from './dto/authResponse.dto';
import { Public } from './auth.guard';
import { SignInDTO } from './dto/signIn.dto';
import { LogOutDTO } from './dto/logOut.dto';
import { handleError } from '../../shared/utils/error-handler.util';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  public constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() dto: SignUpDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDTO> {
    try {
      const result = await this.authService.signUp(dto);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return {
        id: result.id,
        email: result.email,
        accessToken: result.accessToken,
      };
    } catch (error) {
      handleError(error);
    }
  }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() dto: SignInDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDTO> {
    try {
      const result = await this.authService.signIn(dto);

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return result;
    } catch (error) {
      handleError(error);
    }
  }

  @Post('log-out')
  @HttpCode(HttpStatus.OK)
  async logOut(
    @Body() dto: LogOutDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    try {
      res.clearCookie('refreshToken');

      await this.authService.logOut(dto);
    } catch (error) {
      handleError(error);
    }
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDTO> {
    try {
      const refreshToken = req.headers.cookies['refreshToken'] as string;

      const result = await this.authService.refreshTokens({
        refreshToken,
      });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return {
        id: result.id,
        email: result.email,
        accessToken: result.accessToken,
      };
    } catch (error) {
      handleError(error);
    }
  }

  @Get('verify-token')
  @HttpCode(HttpStatus.OK)
  async verifyToken(): Promise<'OK'> {
    return 'OK';
  }
}
