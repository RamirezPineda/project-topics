import { Router } from "express";
import NotificationController from "../controllers/notifications.controller.js";

const router = Router();

router.get(
  "/notifications/user/:id",
  NotificationController.getAllNotifiationsUser
);

export default router;
