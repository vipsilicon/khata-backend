import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class GetUserByIdDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id!: number;
}
