import { Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface.js";

import { v4 as uuidv4 } from "uuid";
//uuidv4(); // '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    passwords: [{ type: String, min: 8, required: true }],
    lastPasswordChange: { type: Date, required: true },
    verificationCode: { type: String, default: () => uuidv4() },
    emailIsVerified: { type: Boolean, default: false },
    state: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
