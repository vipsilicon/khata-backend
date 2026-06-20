import {
  IsString,
  IsOptional,
  IsEmail,
  IsMobilePhone,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsMobilePhone('en-IN')
  @IsNotEmpty()
  mobile!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
