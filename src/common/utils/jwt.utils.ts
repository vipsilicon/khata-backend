import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/jwt.interface';
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
} from '../constants/auth.constants';
import { UnauthorizedException } from '@nestjs/common';

// Constants
import { JWT_CONST } from '../constants/common.constants';

export class JwtUtils {
  static generateAccessToken(payload: IJwtPayload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
    });
  }

  static generateRefreshToken(payload: IJwtPayload) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES,
    });
  }

  static verifyAccessToken(token: string): IJwtPayload {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET) as IJwtPayload;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : JWT_CONST.ERROR.INVALID_TOKEN;
      throw new UnauthorizedException(message);
    }
  }

  static verifyRefreshToken(token: string): Promise<IJwtPayload> {
    try {
      return Promise.resolve(
        jwt.verify(token, REFRESH_TOKEN_SECRET) as IJwtPayload,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : JWT_CONST.ERROR.INVALID_TOKEN;
      throw new UnauthorizedException(message);
    }
  }
}
