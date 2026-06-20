import { IsNumber, Min } from 'class-validator';

export class ActiveDeactivateAccountDto {
  @IsNumber()
  @Min(1)
  id!: number;
}
