import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTOs
import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

// Interfaces
import { IAuth } from 'src/common/interfaces/auth.interface';
import { IJwtPayload } from 'src/common/interfaces/jwt.interface';

// Entity
import { Auth } from './entities/auth.entity';

// Services
import { AdminService } from '../admin/admin.service';
import { UsersService } from '../users/users.service';
import { JwtUtils } from 'src/common/utils/jwt.utils';

// Enums
import { UserRole } from 'src/common/enums/userRole.enums';

// Constants
import { defaultServerResponse } from 'src/common/constants/default.constants';
import {
  ADMIN_CONST,
  JWT_CONST,
  USER_CONST,
} from 'src/common/constants/common.constants';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ActiveDeactivateAccountDto } from './dto/activate-deactivate-account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
  ) {}

  // Admin
  async registerAdmin(createAuthDto: CreateAuthDto) {
    const response = { ...defaultServerResponse };

    try {
      const createAdminData = await Auth.createAdminData(createAuthDto);

      if (createAdminData.email) {
        const emailExists = await this.adminService.checkAdminEmailExists(
          createAdminData.email,
        );
        if (emailExists) {
          throw new ConflictException(ADMIN_CONST.ERROR.EMAIL_ALREADY_EXISTS);
        }
      }

      if (createAdminData.mobile) {
        const mobileExists = await this.adminService.checkAdminMobileExists(
          createAdminData.mobile,
        );
        if (mobileExists) {
          throw new ConflictException(ADMIN_CONST.ERROR.MOBILE_ALREADY_EXISTS);
        }
      }

      const admin = this.authRepository.create(createAdminData);
      const savedAdmin = await this.authRepository.save(admin);

      const createAdminDto: CreateAdminDto = {
        firstName: savedAdmin.firstName,
        lastName: savedAdmin.lastName ?? '',
        email: savedAdmin.email,
        mobile: savedAdmin.mobile,
        authId: savedAdmin.id,
      };

      await this.adminService.create(createAdminDto);

      const adminResponse: IAuth = {
        firstName: savedAdmin.firstName,
        lastName: savedAdmin.lastName ?? null,
        email: savedAdmin.email,
        mobile: savedAdmin.mobile,
        accessToken: '',
        refreshToken: '',
      };

      response.statusCode = HttpStatus.CREATED;
      response.message = ADMIN_CONST.SUCEESS.ADMIN_CREATED;
      response.body = adminResponse;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Login failed';
      } else if (error instanceof Error) {
        response.statusCode = 500;
        response.message = error.message;
      } else {
        response.statusCode = 500;
        response.message = 'Login failed';
      }
    }

    return response;
  }

  async loginAdmin(loginAuthDto: LoginAuthDto) {
    const response = { ...defaultServerResponse };
    const { email, password } = loginAuthDto;

    let adminId: number | null = null;

    try {
      const auth = await this.authRepository.findOne({ where: { email } });

      if (!auth) {
        throw new NotFoundException(ADMIN_CONST.ERROR.AUTH_NOT_FOUND);
      }

      if (auth.email) {
        const emailExists = await this.adminService.checkAdminEmailExists(
          auth.email,
        );
        if (!emailExists) {
          throw new NotFoundException(ADMIN_CONST.ERROR.ADMIN_NOT_FOUND);
        }

        adminId = await this.adminService.getIdByEmail(auth.email);
        if (!adminId) {
          throw new NotFoundException(ADMIN_CONST.ERROR.ADMIN_NOT_FOUND);
        }
      }

      const isPasswordValid = await Auth.validatePassword(
        password,
        auth.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException(ADMIN_CONST.ERROR.INVALID_CREDENTIALS);
      }

      if (auth.role !== UserRole.ADMIN) {
        throw new UnauthorizedException(ADMIN_CONST.ERROR.NOT_ADMIN_USER);
      }

      if (!auth.isActive) {
        throw new UnauthorizedException(ADMIN_CONST.ERROR.INACTIVE_ADMIN);
      }

      const payload: IJwtPayload = {
        id: adminId,
        authId: auth.id,
        email: auth.email,
        role: auth.role,
      };

      const accessToken = JwtUtils.generateAccessToken(payload);
      const refreshToken = JwtUtils.generateRefreshToken(payload);

      const authResponse: IAuth = {
        firstName: auth.firstName,
        lastName: auth.lastName ?? null,
        email: auth.email,
        mobile: auth.mobile,
        accessToken,
        refreshToken,
      };

      response.statusCode = HttpStatus.OK;
      response.message = ADMIN_CONST.SUCEESS.ADMIN_LOGGED_IN;
      response.body = authResponse;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Login failed';
      } else if (error instanceof Error) {
        response.statusCode = 500;
        response.message = error.message;
      } else {
        response.statusCode = 500;
        response.message = 'Login failed';
      }
    }

    return response;
  }

  // User
  async registerUser(createAuthDto: CreateAuthDto) {
    const response = { ...defaultServerResponse };

    try {
      const createUserData = await Auth.createUserData(createAuthDto);

      if (createUserData.email) {
        const emailExists = await this.usersService.checkUserEmailExists(
          createUserData.email,
        );
        if (emailExists) {
          throw new ConflictException(USER_CONST.ERROR.EMAIL_ALREADY_EXISTS);
        }
      }

      if (createUserData.mobile) {
        const mobileExists = await this.usersService.checkUserMobileExists(
          createUserData.mobile,
        );
        if (mobileExists) {
          throw new ConflictException(USER_CONST.ERROR.MOBILE_ALREADY_EXISTS);
        }
      }

      const user = this.authRepository.create(createUserData);
      const savedUser = await this.authRepository.save(user);

      const createUserDto: CreateUserDto = {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName ?? '',
        email: savedUser.email,
        mobile: savedUser.mobile,
        authId: savedUser.id,
      };
      await this.usersService.create(createUserDto);
      const userResponse: IAuth = {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName ?? null,
        email: savedUser.email,
        mobile: savedUser.mobile,
        accessToken: '',
        refreshToken: '',
      };

      response.statusCode = HttpStatus.CREATED;
      response.message = USER_CONST.SUCEESS.USER_CREATED;
      response.body = userResponse;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Login failed';
      } else if (error instanceof Error) {
        response.statusCode = 500;
        response.message = error.message;
      } else {
        response.statusCode = 500;
        response.message = 'Login failed';
      }
    }

    return response;
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
    const response = { ...defaultServerResponse };

    const { email, password } = loginAuthDto;
    let userId: number | null = null;

    try {
      const auth = await this.authRepository.findOne({
        where: { email, role: UserRole.USER },
      });

      if (!auth) {
        throw new NotFoundException(USER_CONST.ERROR.AUTH_NOT_FOUND);
      }

      if (auth.email) {
        const emailExists = await this.usersService.checkUserEmailExists(
          auth.email,
        );
        if (!emailExists) {
          throw new NotFoundException(USER_CONST.ERROR.USER_NOT_FOUND);
        }

        userId = await this.usersService.getIdByEmail(auth.email);
        if (!userId) {
          throw new NotFoundException(USER_CONST.ERROR.USER_NOT_FOUND);
        }
      }

      const isPasswordValid = await Auth.validatePassword(
        password,
        auth.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException(USER_CONST.ERROR.INVALID_CREDENTIALS);
      }

      if (auth.role !== UserRole.USER) {
        throw new UnauthorizedException(USER_CONST.ERROR.NOT_USER);
      }

      if (!auth.isActive) {
        throw new UnauthorizedException(USER_CONST.ERROR.INACTIVE_USER);
      }

      const payload: IJwtPayload = {
        id: userId,
        authId: auth.id,
        email: auth.email,
        role: auth.role,
      };

      const accessToken = JwtUtils.generateAccessToken(payload);
      const refreshToken = JwtUtils.generateRefreshToken(payload);

      const authResponse: IAuth = {
        firstName: auth.firstName,
        lastName: auth.lastName ?? null,
        email: auth.email,
        mobile: auth.mobile,
        accessToken,
        refreshToken,
      };

      response.statusCode = HttpStatus.OK;
      response.message = USER_CONST.SUCEESS.USER_LOGGED_IN;
      response.body = authResponse;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Login failed';
      } else if (error instanceof Error) {
        response.statusCode = 500;
        response.message = error.message;
      } else {
        response.statusCode = 500;
        response.message = 'Login failed';
      }
    }

    return response;
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const response = { ...defaultServerResponse };
    const { refreshToken } = refreshTokenDto;

    try {
      if (!refreshToken) {
        throw new UnauthorizedException(JWT_CONST.ERROR.REFRESH_TOKEN_MISSING);
      }
      const decoded: IJwtPayload =
        await JwtUtils.verifyRefreshToken(refreshToken);

      const payload: IJwtPayload = {
        id: decoded.id,
        authId: decoded.authId,
        email: decoded.email,
        role: decoded.role,
      };

      const newAccessToken = JwtUtils.generateAccessToken(payload);
      const newRefreshToken = JwtUtils.generateRefreshToken(payload);

      response.statusCode = HttpStatus.OK;
      response.message = JWT_CONST.SUCCESS.TOKEN_VERIFIED;
      response.body = {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Token refresh failed';
      } else if (error instanceof Error) {
        response.statusCode = 500;
        response.message = error.message;
      } else {
        response.statusCode = 500;
        response.message = 'Token refresh failed';
      }
    }

    return response;
  }

  async activateAccount(
    activeDeactivateAccountDto: ActiveDeactivateAccountDto,
  ) {
    const response = { ...defaultServerResponse };

    try {
      const auth = await this.authRepository.findOne({
        where: { id: activeDeactivateAccountDto.id },
      });

      if (!auth) {
        throw new NotFoundException('Auth not found');
      }

      if (auth.isActive) {
        throw new ConflictException('Already active');
      } else {
        await this.authRepository.update({ id: auth.id }, { isActive: true });
        response.statusCode = HttpStatus.OK;
        response.message = 'Account activated';
        response.body = { id: auth.id };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Token refresh failed';
      } else if (error instanceof Error) {
        response.statusCode = 500;
        response.message = error.message;
      } else {
        response.statusCode = 500;
        response.message = 'Token refresh failed';
      }
    }

    return response;
  }

  async deactivateAccount(
    activeDeactivateAccountDto: ActiveDeactivateAccountDto,
  ) {
    const response = { ...defaultServerResponse };

    try {
      const auth = await this.authRepository.findOne({
        where: { id: activeDeactivateAccountDto.id },
      });

      if (!auth) {
        throw new NotFoundException('Auth not found');
      }

      if (!auth.isActive) {
        throw new ConflictException('Already deactive');
      } else {
        await this.authRepository.update({ id: auth.id }, { isActive: false });
        response.statusCode = HttpStatus.OK;
        response.message = 'Account deactivated';
        response.body = { id: auth.id };
      }
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Token refresh failed';
      } else if (error instanceof Error) {
        response.statusCode = 500;
        response.message = error.message;
      } else {
        response.statusCode = 500;
        response.message = 'Token refresh failed';
      }
    }

    return response;
  }
}
