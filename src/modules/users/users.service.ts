import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';

// Entity
import { User } from './entities/user.entity';

// Interfaces
import { IAuthPayload } from 'src/common/interfaces/auth.interface';

// DTOs
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Constants
import { defaultServerResponse } from 'src/common/constants/default.constants';
import { USER_CONST } from 'src/common/constants/common.constants';
import { IUser } from 'src/common/interfaces/users.interface';

// Define a safe type for request auth payload

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const response = { ...defaultServerResponse };

    try {
      const createUserData = User.createUserData(createUserDto);
      const user = this.usersRepository.create(createUserData);
      const createdUser = await this.usersRepository.save(user);

      const body: IUser = {
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        mobile: createdUser.mobile,
        avatar: createdUser.avatar,
        authId: createdUser.authId,
      };
      response.statusCode = HttpStatus.OK;
      response.message = USER_CONST.SUCCESS.USER_CREATED;
      response.body = body;
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message =
          error.message || USER_CONST.ERROR.FAILED_REGISTER_USER;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = USER_CONST.ERROR.FAILED_REGISTER_USER;
      }
    }

    return response;
  }

  async getUserById(id: number) {
    const response = { ...defaultServerResponse };
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(USER_CONST.ERROR.USER_NOT_FOUND);
      }

      const body: IUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
        authId: user.authId,
      };

      response.statusCode = HttpStatus.OK;
      response.message = USER_CONST.SUCCESS.USER_LIST_FETCHED;
      response.body = body;
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message =
          error.message || USER_CONST.ERROR.FAILED_FETCHED_USER_BY_ID;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = USER_CONST.ERROR.FAILED_FETCHED_USER_BY_ID;
      }
    }

    return response;
  }

  async checkUserEmailExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }

  async checkUserMobileExists(mobile: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { mobile } });
    return !!user;
  }

  async getIdByEmail(email: string): Promise<number | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user ? user.id : null;
  }

  async getUsersList(paginationDto: PaginationDto) {
    const response = { ...defaultServerResponse };
    const { page = 1, limit = 10 } = paginationDto;

    try {
      const [users, total] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      const data: IUser[] = users.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          avatar: user.avatar,
          authId: user.authId,
        };
      });

      response.statusCode = HttpStatus.OK;
      response.message = USER_CONST.SUCCESS.USER_LIST_FETCHED;
      response.body = {
        data,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message =
          error.message || USER_CONST.ERROR.FAILED_FETCHED_USER_LISTS;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = USER_CONST.ERROR.FAILED_FETCHED_USER_LISTS;
      }
    }
    return response;
  }

  async getUserProfile(req: Request) {
    // Treat req as possibly having an auth payload in a type-safe way
    const typedReq = req as Request & { auth?: IAuthPayload };
    const userId = typedReq.auth?.id ?? 0;
    const response = { ...defaultServerResponse };

    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(USER_CONST.ERROR.USER_NOT_FOUND);
      }

      const body: IUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
        authId: user.authId,
      };

      response.statusCode = HttpStatus.OK;
      response.message = USER_CONST.SUCCESS.USER_PROFILED_FETCHED;
      response.body = body;
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message =
          error.message || USER_CONST.ERROR.FAILED_FETCHED_USER_PROFILE;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = USER_CONST.ERROR.FAILED_FETCHED_USER_PROFILE;
      }
    }

    return response;
  }

  async updateUserProfile(req: Request, updateUserDto: UpdateUserDto) {
    const typedReq = req as Request & { auth?: IAuthPayload };
    const userId = typedReq.auth?.id ?? 0;
    const response = { ...defaultServerResponse };

    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(USER_CONST.ERROR.USER_NOT_FOUND);
      }

      if (user.mobile !== updateUserDto.mobile) {
        const existingUser = await this.usersRepository.findOne({
          where: { mobile: updateUserDto.mobile },
        });

        if (existingUser) {
          throw new ConflictException(USER_CONST.ERROR.MOBILE_ALREADY_EXISTS);
        }
      }

      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      user.mobile = updateUserDto.mobile;

      if (updateUserDto?.avatar) {
        user.avatar = updateUserDto?.avatar ?? user.avatar;
      }

      await this.usersRepository.save(user);

      const body: IUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
        authId: user.authId,
      };

      response.statusCode = HttpStatus.OK;
      response.message = USER_CONST.SUCCESS.USER_PROFILED_UPDATED;
      response.body = body;
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message =
          error.message || USER_CONST.ERROR.FAILED_UPDATED_USER_PROFILE;
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = USER_CONST.ERROR.FAILED_UPDATED_USER_PROFILE;
      }
    }

    return response;
  }

  async isUserExist(id: number): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (user) {
      return true;
    }

    return false;
  }
}
