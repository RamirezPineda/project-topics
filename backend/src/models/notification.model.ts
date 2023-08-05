import { Schema, model } from "mongoose";
import { Notification } from "../interfaces/notification.interface.js";

const NotificationSchema = new Schema<Notification>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const NotificationModel = model("Notification", NotificationSchema);

export default NotificationModel;
