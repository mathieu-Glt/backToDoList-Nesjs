import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 100)
  password: string;
}
