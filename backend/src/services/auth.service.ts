import { Auth } from "../interfaces/auth.interface.js";
import { User } from "../interfaces/user.interface.js";

import { FileArray, UploadedFile } from "express-fileupload";

import SegipModel from "../models/segip.model.js";
import UserModel from "../models/user.model.js";

import { verify, encrypt } from "../utils/bcrypt.utils.js";
import { generateToken } from "../utils/jwt.utils.js";
import { confirmFace } from "../utils/rekognition.js";
import { transport } from "../config/nodemailer.js";
import PersonModel from "../models/person.model.js";

type fileUploadType = FileArray | undefined | null;

type dataUserType = {
  ci: string;
  name: string;
  email: string;
  address: string;
  photoUrl: string;
  phone: string;
};

const verifyDataUser = async (ci: string, files: fileUploadType) => {
  const existPerson = await PersonModel.findOne({ ci });
  if (existPerson) return { message: "El usuario ya existe" };

  // llamada a la api del Segip
  const segipPersonFound = await SegipModel.findOne({ ci });
  if (!segipPersonFound)
    return { message: "El ci no esta registrado en el SEGIP" };

  if (files?.image) {
    // llamada a la api de reconocimiento facial
    const userImage = files.image as UploadedFile;
    const isOk = await confirmFace(userImage, segipPersonFound.photo);

    if (!isOk) return { message: "El ci enviado no coicide con la foto" };
  } else {
    return { message: "No envio una foto" };
  }

  // enviando los datos encontrados del Segip
  return segipPersonFound;
};

// registro de nuevo vecino
const registerNewUser = async ({
  name,
  email,
  ci,
  address,
  phone,
  photoUrl,
}: dataUserType) => {
  //data limpia, se supone que paso todas las validaciones de la funcion VerifyDataUser

  const passwordHash = await encrypt(ci);
  const newUser = await UserModel.create({
    email,
    passwords: [passwordHash],
    lastPasswordChange: new Date(),
  });

  const newPerson = await PersonModel.create({
    ci,
    name,
    address,
    phone,
    photo: photoUrl,
    userId: newUser._id,
  });

  //Envia el mensaje de verificacion del email
  const info = await transport.sendMail({
    from: '"Ricky Roy Ramirez Pineda" <ramirezpineda@midominio.com>',
    to: `${email}`,
    subject: `Código de verificación`,
    html: `<h1>Este es su código de verificación: ${newUser.verificationCode}</h1>`,
  });

  const data = { user: newUser, person: newPerson };
  return data;
};

// Verifica codigo de email
const verifyEmailCode = async (email: string, code: string) => {
  const userFound = await UserModel.findOne({ email });
  if (!userFound) return false;

  const isCorrect = code === userFound.verificationCode;

  if (isCorrect) {
    userFound.emailIsVerified = true;
    await userFound.save();
  }

  return isCorrect;
};

const login = async ({ email, password }: Auth) => {
  const userFound = await UserModel.findOne({ email });
  if (!userFound) return null;

  if (!userFound.emailIsVerified) return null; // el email no esta verificado

  const lastPasswordIndex = userFound.passwords.length;
  const passwordHash = userFound.passwords[lastPasswordIndex].password;

  const isCorrect = await verify(password, passwordHash);
  if (!isCorrect) return null;

  const token = generateToken(userFound);
  const data = {
    token,
    user: { _id: userFound._id, email: userFound.email },
  };

  return data;
};

export default {
  verifyDataUser,
  registerNewUser,
  login,
  verifyEmailCode,
};
