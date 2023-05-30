import { Types } from 'mongoose'

export interface Complaint {
  _id?: string;
  title: string;
  description: string;
  photos: string[];
  state: string;
  latitude: Types.Decimal128;
  longitude: Types.Decimal128;
  categoryId: string;
  personId: string;
}
