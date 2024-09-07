import {
    Body,
    Headers,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Inject,
    Post,
    NotFoundException,
    ConflictException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { SignUpDTO } from './dto/signUp.dto';
  import { AuthResponseDTO } from './dto/authResponse.dto';
  import { Public } from './auth.guard';
  import { SignInDTO } from './dto/signIn.dto';
  import { RefreshTokenDTO } from './dto/refreshToken.dto';
  import { AccessTokenDTO } from './dto/accessToken.dto';
  import { SignOutDTO } from './dto/signOut.dto';
import { IS_PUBLIC_KEY } from './auth.guard';
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
    @Get()
    @HttpCode(HttpStatus.OK)
    async test(): Promise<string> {
      try {
        throw new ConflictException('Conflict');
        return 'Hello World! ttttttt';
      } catch (error: Error | any) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    @Public()
    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() dto: SignUpDTO): Promise<AuthResponseDTO> {
      try {
        return this.authService.signUp(dto);
      } catch (error: Error | any) {
        throw new HttpException(error.message, error.status);
      }
    }
  
    @Public()
    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() dto: SignInDTO): Promise<AuthResponseDTO> {
      console.log(dto);
      try {
        return await this.authService.signIn(dto);
      } catch (error) {
        throw new HttpException(error, 500);
      }
    }
  
    @Post('sign-out')
    @HttpCode(HttpStatus.OK)
    async signOut(@Body() dto: SignOutDTO): Promise<void> {
      try {
        await this.authService.signOut(dto);
      } catch (error) {
        throw new HttpException(error, 500);
      }
    }
  
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Body() dto: RefreshTokenDTO): Promise<AuthResponseDTO> {
      try {
        return await this.authService.refreshTokens(dto);
      } catch (error) {
        throw new HttpException(error, 500);
      }
    }
  
    @Get('verify-token')
    @HttpCode(HttpStatus.OK)
    async verifyToken(
      @Headers('authorization') dto: AccessTokenDTO,
    ): Promise<AuthResponseDTO> {
      try {
        const user = await this.authService.verifyAccessToken(dto.accessToken);
  
        return {
          id: user.id,
          email: user.email,
          accessToken: dto.accessToken,
          refreshToken: user.refreshToken,
        };
      } catch (error) {
        throw new HttpException(error, 500);
      }
    }
  }

function Public(): (target: AuthController, propertyKey: "test", descriptor: TypedPropertyDescriptor<() => Promise<string>>) => void | TypedPropertyDescriptor<() => Promise<string>> {
    throw new Error('Function not implemented.');
}
