import { PartialType } from '@nestjs/mapped-types';
import { CreateBankDto } from './create-bank.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBankDto extends PartialType(CreateBankDto) {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsOptional()
  @IsString()
  iconUrl!: string;
}
