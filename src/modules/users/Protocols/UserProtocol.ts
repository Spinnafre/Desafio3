export interface IUser {
  id?: string;
  name: string;
  admin?: boolean;
  email: string;
  created_at: Date;
  updated_at: Date;
}
