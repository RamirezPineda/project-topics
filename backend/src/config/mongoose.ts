import "dotenv/config";
import { connect } from "mongoose";

import SegipModel from "../models/segip.model.js";
import CategoryModel from "../models/category.model.js";

export const dbConnet = async () => {
  const DB_URI = <string>process.env.DB_URI || "";
  await connect(DB_URI);
};

export const seeders = async () => {
  console.log("Implementing seeders");
  await SegipModel.create({
    name: "Joe Doe",
    address: "Street Fake #123",
    phone: "87654321",
    photo: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1683827537/exam1-software/cx3no6vuqqsqqaend88m.jpg",
    ci: "12345678",
  });

  await CategoryModel.create([
    {name: "Agua potable y alcantarillado", image: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1684928551/topics/categories/sewer_ggugag.png"},
    {name: "Basura y reciclaje", image: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1684928559/topics/categories/trash_jw8mda.png"},
    {name: "Problemas de alumbrado público", image: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1684928581/topics/categories/street-lamp_qj6zlv.png"},
    {name: "Transporte público", image: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1684928759/topics/categories/bus_dlqrz6.png"},
    {name: "Baches y estado de las calles", image: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1684929895/topics/categories/road_tbz3bd.png"},
    {name: "Espacios públicos deteriorados", image: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1684929917/topics/categories/park_nm3l0f.png"},
    {name: "Vandalismo y graffiti", image: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1684929906/topics/categories/spray_vfw53n.png"},
    {name: "Ruido y contaminación acústica", image: "https://res.cloudinary.com/dwn7fonh6/image/upload/v1684930167/topics/categories/noisy_ifwk5d.png"},
  ]);

  console.log("Seeders implements");
};
