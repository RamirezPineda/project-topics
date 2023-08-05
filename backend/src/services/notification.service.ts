import NotificationModel from "../models/notification.model.js";

// Get all notifications of user
const getAllNotificationsUser = async (userId: string) => {
  const allNotifications = await NotificationModel.find({ userId }).sort({
    createdAt: -1,
  });

  return allNotifications;
};

export default { getAllNotificationsUser };
