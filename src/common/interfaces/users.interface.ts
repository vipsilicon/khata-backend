export interface IUser {
  id: number;
  firstName: string;
  lastName: string | undefined;
  email: string;
  mobile: string;
  avatar: string | null | undefined;
  authId: number;
}
