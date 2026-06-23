import {
  Controller,
  Post,
  Put,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
} from '@nestjs/common';

// Services
import { BanksService } from './banks.service';

// DTOs
import { CreateBankDto } from './dto/create-bank.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBankByIdDto } from './dto/update-bank-by-id.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

// Guards
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  create(@Body() createBankDto: CreateBankDto) {
    return this.banksService.create(createBankDto);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.banksService.findAll(paginationDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  updateById(
    @Param() params: UpdateBankByIdDto,
    @Body() updateBankDto: UpdateBankDto,
  ) {
    return this.banksService.update(params.id, updateBankDto);
  }
}
