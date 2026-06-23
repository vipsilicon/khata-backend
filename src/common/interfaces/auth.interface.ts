export interface IAuth {
  firstName: string;
  lastName: string | null;
  email: string;
  mobile: string;
  accessToken: string;
  refreshToken: string;
}

export interface IAuthPayload {
  id: number;
}
