import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtUtils } from '../utils/jwt.utils';
import { JWT_CONST } from '../constants/common.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | Observable<boolean> | boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { auth?: unknown }>();

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
    if (!token) {
      return false;
    }

    try {
      const decoded = JwtUtils.verifyAccessToken(token);
      request.auth = decoded; // Attach decoded token to request object
      return true;
    } catch {
      throw new UnauthorizedException(JWT_CONST.ERROR.INVALID_TOKEN);
    }
  }
}
