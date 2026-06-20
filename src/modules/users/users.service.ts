import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { USER_CONST } from 'src/common/constants/common.constants';
import { defaultServerResponse } from 'src/common/constants/default.constants';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createUserData = User.createUserData(createUserDto);
    const user = this.usersRepository.create(createUserData);
    return this.usersRepository.save(user);
  }

  async getUserById(id: number) {
    const response = { ...defaultServerResponse };
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException(USER_CONST.ERROR.USER_NOT_FOUND);
      }
      response.statusCode = HttpStatus.OK;
      response.message = USER_CONST.SUCEESS.USER_LIST_FETCHED;
      response.body = user;
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Login failed';
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = 'Login failed';
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

      response.statusCode = HttpStatus.OK;
      response.message = USER_CONST.SUCEESS.USER_LIST_FETCHED;
      response.body = {
        data: users,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        response.message = error.message || 'Login failed';
      } else if (error instanceof Error) {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = error.message;
      } else {
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = 'Login failed';
      }
    }
    return response;
  }
}
