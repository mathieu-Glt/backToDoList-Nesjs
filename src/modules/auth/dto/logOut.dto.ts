import { IsNotEmpty, IsNumber } from 'class-validator';

export class LogOutDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
