import { Auth } from "./auth.interface";


export interface User {
  _id?: string;
  email: string;
  passwords: string[];
  lastPasswordChange: Date;
  tokenMovil: string;
  state: boolean;
}
