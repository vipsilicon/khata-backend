import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateUserBankDto {
  @IsInt()
  @Min(1)
  userId!: number;

  @IsInt()
  @Min(1)
  bankId!: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  initialAmount?: number;
}
