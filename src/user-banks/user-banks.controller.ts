import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import type { Request } from 'express';

// Services
import { UserBanksService } from './user-banks.service';

// Guards
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

// DTOs
import { CreateUserBankDto } from './dto/create-user-bank.dto';

@Controller('user-banks')
export class UserBanksController {
  constructor(private readonly userBanksService: UserBanksService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserBankDto: CreateUserBankDto, @Req() req: Request) {
    return this.userBanksService.create(createUserBankDto, req);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  list(@Req() req: Request) {
    return this.userBanksService.list(req);
  }
}
