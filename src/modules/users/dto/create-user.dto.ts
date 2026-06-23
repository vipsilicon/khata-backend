import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsMobilePhone('en-IN')
  @IsNotEmpty()
  mobile!: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsNumber()
  @IsNotEmpty()
  authId!: number;
}
