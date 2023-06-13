
export interface Complaint {
  _id: string;
  title: string;
  description: string;
  photos: string[];
  state: string;
  latitude: number;
  longitude: number;
  categoryId: string;
  personId: string;
  createdAt: Date;
}
