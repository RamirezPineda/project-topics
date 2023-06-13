import { Complaint } from "./complaint.interface";

export interface Category {
  _id?: string;
  name: string;
  image: string;
  complaints: Complaint[];
}