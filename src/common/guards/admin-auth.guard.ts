import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

// Interfaces
import { IJwtPayload } from '../interfaces/jwt.interface';

// Constants
import { GUARD_CONST } from '../constants/common.constants';

// Enum
import { UserRole } from '../enums/userRole.enums';

export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { auth: IJwtPayload }>();

    const auth = request.auth;

    if (!auth) {
      throw new UnauthorizedException(GUARD_CONST.ERROR.USER_NOT_AUTHENTICATED);
    }

    if (auth.role === UserRole.ADMIN) {
      return true;
    } else {
      throw new UnauthorizedException(GUARD_CONST.ERROR.USER_NOT_AN_ADMIN);
    }
  }
}
