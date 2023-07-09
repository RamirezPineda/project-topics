export interface User {
  _id?: string;
  email: string;
  passwords: string[];
  lastPasswordChange?: Date;
  tokenMovil: string;
  state?: boolean;
  rolId: string;
}
