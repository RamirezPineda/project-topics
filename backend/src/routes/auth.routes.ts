import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

import fileUpload from "express-fileupload";

const router = Router();

router.post(
  "/verify-data-user",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  AuthController.verifyDataUser
);

router.post("/register", AuthController.registerNewUser);

router.post("/verify-email-code", AuthController.verifyEmailCode);

router.post("/login", AuthController.login);

// router.post("/logout", AuthController.logout);

export default router;
