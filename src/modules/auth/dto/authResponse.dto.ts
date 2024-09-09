import { IsString, IsNumber } from 'class-validator';

export class AuthResponseDTO {
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}