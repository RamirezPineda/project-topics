import { Schema, model } from "mongoose";
import { Person } from "../interfaces/person.interface.js";

const PersonSchema = new Schema<Person>(
  {
    name: String,
    ci: String,
    photo: String,
    address: String,
    phone: String,
    userId: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PersonModel = model("Person", PersonSchema);

export default PersonModel;
