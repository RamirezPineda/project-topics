import { Request, Response } from "express";
import ComplaintService from "../services/complaint.service.js";

const addComplaint = async (req: Request, res: Response) => {
  try {
    const { title, description, categoryId, personId, latitude, longitude } =
      req.body;
    console.log(req.body);
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

    if ("message" in newComplaint) {
      return res.status(400).json(newComplaint);
    }

    return res.json(newComplaint);
    // res.json({message: "hola"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error en el server" });
  }
};

const updateComplaint = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, photos, categoryId, personId } = req.body;
    const updatedComplaint = await ComplaintService.updateComplaint(
      `${id}`,
      {
        title,
        description,
        photos,
        categoryId,
        personId,
      },
      req.files
    );

    if (!updatedComplaint || "message" in updatedComplaint) {
      return res.status(400).json(updatedComplaint);
    }

    return res.status(200).json(updatedComplaint);
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

export default {
  addComplaint,
  getAllComplaintPerson,
  deleteComplaint,
  updateComplaint,
};
