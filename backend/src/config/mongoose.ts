import "dotenv/config";
import { connect } from "mongoose";

import SegipModel from "../models/segip.model.js";

export const dbConnet = async () => {
  const DB_URI = <string>process.env.DB_URI || "";
  await connect(DB_URI);
};

export const seeders = async () => {
  await SegipModel.create({
    name: "Joe Doe",
    address: "Street Fake #123",
    phone: "87654321",
    photo: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1683827537/exam1-software/cx3no6vuqqsqqaend88m.jpg",
    ci: "12345678",
  });

  console.log("Seeders implements");
};
