import { Controller, Post, Body, Put, UseGuards } from '@nestjs/common';

// Services
import { AuthService } from './auth.service';

// DTOs
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ActiveDeactivateAccountDto } from './dto/activate-deactivate-account.dto';

// Guards
import { AdminAuthGuard } from 'src/common/guards/admin-auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Admin
  @Post('register/admin')
  registerAdmin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.registerAdmin(createAuthDto);
  }

  @Post('login/admin')
  loginAdmin(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginAdmin(loginAuthDto);
  }

  // User
  @Post('register/user')
  registerUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.registerUser(createAuthDto);
  }

  @Post('login/user')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginUser(loginAuthDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Put('activate')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  activateAccount(
    @Body() activeDeactivateAccountDto: ActiveDeactivateAccountDto,
  ) {
    return this.authService.activateAccount(activeDeactivateAccountDto);
  }

  @Put('deactivate')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  deactivateAccount(
    @Body() activeDeactivateAccountDto: ActiveDeactivateAccountDto,
  ) {
    return this.authService.deactivateAccount(activeDeactivateAccountDto);
  }
}
