import { Auth } from "./auth.interface";

interface Password {
  password: string;
}

export interface User {
  _id?: string;
  email: string;
  passwords: Password[];
  lastPasswordChange: Date;
  verificationCode: string;
  emailIsVerified: boolean;
  state: boolean;
}
