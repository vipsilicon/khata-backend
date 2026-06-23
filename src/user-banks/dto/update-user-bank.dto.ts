import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, Min } from 'class-validator';

// DTOs
import { CreateUserBankDto } from './create-user-bank.dto';

export class UpdateUserBankDto extends PartialType(CreateUserBankDto) {
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  initialAmount?: number;
}
