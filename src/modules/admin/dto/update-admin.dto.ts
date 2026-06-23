import { PartialType } from '@nestjs/mapped-types';

// DTOs
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
