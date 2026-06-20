import {
  Controller,
  Get,
  Post,
  // Put,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { OwnerAdminGuard } from 'src/common/guards/owner-admin.guard';
import { PaginationDto } from './dto/pagination.dto';
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  getUsersList(@Query() paginationDto: PaginationDto) {
    return this.usersService.getUsersList(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, OwnerAdminGuard) // You can add appropriate guards here for authentication/authorization
  findUserById(@Param() params: GetUserByIdDto) {
    return this.usersService.getUserById(params.id);
  }
}
