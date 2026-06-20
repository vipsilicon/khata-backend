import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
