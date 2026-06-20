import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PaginationDto } from './dto/pagination.dto';
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
