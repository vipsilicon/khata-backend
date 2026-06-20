import { UserRole } from '../enums/userRole.enums';

export interface IJwtPayload {
  id: number | null;
  authId: number;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
