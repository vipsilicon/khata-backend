import { Controller, Get, Query, UseGuards } from '@nestjs/common';

// Services
import { AdminService } from './admin.service';

// DTOs
import { PaginationDto } from './dto/pagination.dto';

// Guards
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('list')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  getAdminList(@Query() paginationDto: PaginationDto) {
    return this.adminService.getAdminList(paginationDto);
  }
}
