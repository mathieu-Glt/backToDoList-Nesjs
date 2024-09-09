import { IsNotEmpty, IsNumber } from 'class-validator';

export class SignOutDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}