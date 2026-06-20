import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { IJwtPayload } from '../interfaces/jwt.interface';
import { UserRole } from '../enums/userRole.enums';
import { GUARD_CONST } from '../constants/common.constants';

@Injectable()
export class OwnerAdminGuard implements CanActivate {
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
    }

    const requestId = request.params.id;

    if (!requestId) {
      throw new BadRequestException(GUARD_CONST.ERROR.PARSE_ID_MISSING);
    }

    const parsedId = Number(requestId);

    if (isNaN(parsedId)) {
      throw new BadRequestException(GUARD_CONST.ERROR.PARSE_ID_MUST_BE_NUMBER);
    }

    if (auth.id === parsedId) {
      return true;
    }

    throw new UnauthorizedException(GUARD_CONST.ERROR.USER_DENIED);
  }
}
