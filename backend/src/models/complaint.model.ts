import { Schema, model, Types } from "mongoose";
import { Complaint } from "../interfaces/complaint.interface.js";

const ComplaintSchema = new Schema<Complaint>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    photos: [{ type: String }],
    state: { type: String, default: "pendiente" },
    latitude: { type: Types.Decimal128, required: true },
    longitude: { type: Types.Decimal128, required: true },
    categoryId: { type: String, required: true },
    personId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ComplaintModel = model("Complaint", ComplaintSchema);

export default ComplaintModel;
