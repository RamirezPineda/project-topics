import { Request, Response } from "express";
import ComplaintService from "../services/complaint.service.js";

const addComplaint = async (req: Request, res: Response) => {
  try {
    const { title, description, categoryId, personId, latitude, longitude } =
      req.body;

    const newComplaint = await ComplaintService.addComplaint(
      {
        title,
        description,
        photos: [],
        latitude,
        longitude,
        categoryId,
        personId,
        state: "",
      },
      req.files
    );

    res.json(newComplaint);
    // res.json({message: "hola"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const getAllComplaintPerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allComplaints = await ComplaintService.getAllComplaintPerson(`${id}`);

    res.status(200).json(allComplaints);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const deleteComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await ComplaintService.deleteComplaint(`${id}`);

    return res.status(200).json(deletedComplaint);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

export default { addComplaint, getAllComplaintPerson, deleteComplaint };
