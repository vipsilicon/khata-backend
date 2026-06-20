import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
// import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { PaginationDto } from './dto/pagination.dto';
import { defaultServerResponse } from 'src/common/constants/default.constants';
import { ADMIN_CONST } from 'src/common/constants/common.constants';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const createAdminData = Admin.createAdminData(createAdminDto);
    const admin = this.adminRepository.create(createAdminData);
    return await this.adminRepository.save(admin);
  }

  async getAdminList(paginationDto: PaginationDto) {
    const response = { ...defaultServerResponse };

    const { page = 1, limit = 10 } = paginationDto;

    try {
      const [users, total] = await this.adminRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      response.statusCode = HttpStatus.OK;
      response.message = ADMIN_CONST.SUCEESS.ADMIN_LIST_FETCHED;
      response.body = {
        data: users,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error: unknown) {
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

  async checkAdminEmailExists(email: string): Promise<boolean> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    return !!admin;
  }

  async checkAdminMobileExists(mobile: string): Promise<boolean> {
    const admin = await this.adminRepository.findOne({ where: { mobile } });
    return !!admin;
  }

  async getIdByEmail(email: string): Promise<number | null> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    return admin ? admin.id : null;
  }
}
