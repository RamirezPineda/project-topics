import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";

const verifyDataUser = async (req: Request, res: Response) => {
  try {
    const { ci } = req.body;
    const response = await AuthService.verifyDataUser(ci, req.files);

    if ("message" in response) {
      return res.status(400).json(response); //envia mensaje de error
    }

    return res.status(200).json(response); //datos del segip (name, photo, etc)
  } catch (error) {
    console.log("EL error: ", error);
    res.status(500).json(error);
  }
};

const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { ci, name, email, address, phone, photoUrl } = req.body;

    const newUser = await AuthService.registerNewUser({
      name,
      email,
      ci,
      address,
      phone,
      photoUrl,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const verifyEmailCode = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const isCorrect = await AuthService.verifyEmailCode(email, code);

    if (!isCorrect)
      return res.status(400).json({
        messange:
          "El usuario con ese email no existe o el codigo es incorrecto",
      });

    return res
      .status(200)
      .json({ message: "El email fue verificado exitosamente" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login({ email, password });

    if (!user)
      return res.status(400).json({ message: "Email or Password incorrect" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default {
  verifyDataUser,
  registerNewUser,
  verifyEmailCode,
  login,
  logout,
};
