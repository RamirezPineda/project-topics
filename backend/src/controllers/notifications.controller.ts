import { Request, Response } from "express";
import NotificationService from "../services/notification.service.js";

const getAllNotifiationsUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allNotifications = await NotificationService.getAllNotificationsUser(
      id
    );

    return res.status(200).json(allNotifications);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default { getAllNotifiationsUser };
