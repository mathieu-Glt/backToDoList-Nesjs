import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDTO } from './dto/signUp.dto';
import { AuthResponseDTO, RefreshTokenDTO } from './dto/authResponse.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entity/user.orm-entity';
import { SignInDTO } from './dto/signIn.dto';
import { IUserRepo } from '../user/repo/userRepo.spi';
import * as bcrypt from 'bcrypt';
import { LogOutDTO } from './dto/logOut.dto';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;

  public constructor(
    @Inject('IUserRepo')
    private readonly userRepo: IUserRepo,
    // No abstractions are needed for the next two injections as they come from NestJS.
    // Creating abstractions for them is unnecessary; it is a matter of choice.
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    this.jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!this.jwtSecret || !this.jwtRefreshSecret)
      throw new InternalServerErrorException('JWT secrets is not defined');
  }

  public async signUp({
    email,
    password,
    confirmPassword,
    firstname,
    lastname,
  }: SignUpDTO): Promise<AuthResponseDTO & RefreshTokenDTO> {
    if (password !== confirmPassword)
      throw new NotAcceptableException(
        'Password and confirm password does not match',
      );

    // The same applies to the next line; no abstraction is needed for bcrypt.
    // This is a matter of choice.
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await this.userRepo.exists(email);
    if (userExists) throw new ConflictException('User already exists');

    const user = new User();
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    user.password = hashedPassword;
    const tokens = await this.generateTokens(user);

    user.refreshToken = tokens.refreshToken;

    await this.userRepo.save(user);

    return {
      id: user.id,
      email: user.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  public async signIn({
    email,
    password,
  }: SignInDTO): Promise<AuthResponseDTO & RefreshTokenDTO> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user);

    await this.userRepo.updateRefreshToken(tokens.refreshToken, user.id);

    return {
      id: user.id,
      email: user.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  public async logOut({ userId }: LogOutDTO): Promise<void> {
    await this.userRepo.updateRefreshToken(null, userId);
  }

  public async refreshTokens({
    refreshToken,
  }: RefreshTokenDTO): Promise<AuthResponseDTO & RefreshTokenDTO> {
    const user = await this.verifyRefreshToken(refreshToken);

    const tokens = await this.generateTokens(user);

    await this.userRepo.updateRefreshToken(tokens.refreshToken, user.id);

    return {
      id: user.id,
      email: user.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  public async verifyAccessToken(accessToken: string): Promise<User> {
    let payload: { sub: number };

    try {
      payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.jwtSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }

    const user = await this.userRepo.findById(payload.sub);
    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  public async verifyRefreshToken(refreshToken: string): Promise<User> {
    let payload: { sub: number };

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.jwtRefreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userRepo.findById(payload.sub);
    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtSecret,
      expiresIn: '2h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtRefreshSecret,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
