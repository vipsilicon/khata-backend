import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBankDto {
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
