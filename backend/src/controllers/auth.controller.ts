import { Request, Response } from "express";

import { Message } from "firebase-admin/lib/messaging";

import AuthService from "../services/auth.service.js";
// import { io } from '../index.js'

import { firebaseMessaging } from '../config/firebase.js'

// const requestMessage: Message = {
//   token:
//     "em1dG9kZQNqXoZTjjvK04W:APA91bGE-H-1RNU83G9iS1GKNNTqhzyak0cldsGR1sw0WuSW9rcQA2RtPTXM8Ug8lDf2P6bqRGfwiAb7fj_eXm0RNVtmAQMIbSmueFtyH_wtUi5ilFHD9un7kTRfHDuFx-zVTpEUao1o",
//   notification: { title: "Este es el titulo", body: "Este es el body" },
//   data: {
//     comida: "frita desde el backend",
//     complaint: `{
//       "state": "estado de la denuncia",
//       "observation": "observacion de la denuncia"
//     }`
//   },
//   android: { priority:"high" },
// };
// const nuevo = firebaseMessaging;
// firebaseMessaging.send(requestMessage);

const isAlive = async (req: Request, res: Response) => {
  try {
    // io.emit("isAlive", "IS ALIVE OK")

    return res.status(200).json({ menssage: "is Ok" });
  } catch (error) {
    console.log("EL error: ", error);
    res.status(500).json(error);
  }
};

const verifyDataUser = async (req: Request, res: Response) => {
  try {
    const { ci } = req.body;
    console.log("Request: ", req.body);
    console.log("Request files: ", req.files);
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
    const { ci, name, email, password, address, phone, photo, tokenMovil } =
      req.body;

    const newUser = await AuthService.registerNewUser({
      name,
      email,
      password,
      ci,
      address,
      phone,
      photo,
      tokenMovil,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const sendEmail = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    await AuthService.sendEmail(email, code);
    return res
      .status(200)
      .json({ message: "Se envio un código de verificación a su email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
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
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { address, phone, password } = req.body;
    const response = await AuthService.updateProfile(id, {
      address,
      phone,
      password,
    });

    if ("message" in response) {
      return res.status(400).json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

// const logout = async (req: Request, res: Response) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Ocurrio un error en el server" });
//   }
// };

export default {
  isAlive,
  verifyDataUser,
  registerNewUser,
  sendEmail,
  login,
  updateProfile,
  // logout,
};
