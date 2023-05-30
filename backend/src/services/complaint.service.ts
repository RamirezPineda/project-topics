import "dotenv/config";
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from "chatgpt";
import { UploadedFile } from "express-fileupload";
import fs from "fs-extra";

import CategoryModel from "../models/category.model.js";
import PersonModel from "../models/person.model.js";
import ComplaintModel from "../models/complaint.model.js";

import { Complaint } from "../interfaces/complaint.interface.js";
import { fileUploadType } from "../interfaces/fileUploadType.js";

import { uploadImage } from "../utils/uploadImage.utils.js";
import { promt } from "../utils/promt.js";

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY || "",
});


const addComplaint = async (data: Complaint, files: fileUploadType) => {
  const person = await PersonModel.findById({ _id: data.personId });
  const category = await CategoryModel.findById({ _id: data.categoryId });

  if (!person || !category)
    return { message: "La persona o categoria de denuncia no existe" };

  if (!files) return { message: "No envio fotos" };

  // const currentDate = new Date();

  // const existComplaint = await ComplaintModel.findOne({
  //   categoryId: data.categoryId,
  //   personId: data.personId,
  //   createAt: {
  //     $gte: currentDate.setHours(0, 0, 0, 0), 
  //     $lt: currentDate.setHours(23, 59, 59, 999), 
  //   }
  // });
  // console.log(existComplaint);

  //Todo: verificar que la descripcion sea valida (Usar ChatGPT)
  const response = await api.sendMessage(
    promt(category.name, data.description)
  );
  console.log(response.text);
  console.log("Contiene Ok?: ",response.text.includes('Ok'));
  if(!response.text.includes('Ok')) {// la descripcion tuvo problemas
    return {message: response.text};
  }
  // return { message: response.text };

  const photos: string[] = [];
  const uploadPromises: Promise<void>[] = [];

  for (const key in files) {
    const photo = files[key];
    const { tempFilePath } = photo as UploadedFile;

    const uploadPromise = uploadImage(tempFilePath).then((imageCloudinary) => {
      photos.push(imageCloudinary.secure_url);
      return fs.unlink(tempFilePath); // deleted image of storage (uploads)
    });

    uploadPromises.push(uploadPromise);
  }

  await Promise.all(uploadPromises); // ejecuta todas las promesas


  //Todo: verificar que las fotos sean validas

  const newComplaint = await ComplaintModel.create({
    title: data.title,
    description: data.description,
    photos,
    latitude: data.latitude,
    longitude: data.longitude,
    categoryId: data.categoryId,
    personId: data.personId,
  });

  return newComplaint;
};

const getAllComplaintPerson = async (personId: string) => {
  const allComplaints = await ComplaintModel.find({ personId });
  return allComplaints;
};

const deleteComplaint = async (id: string) => {
  //Todo: validar que la denuncia existe
  const deletedComplaint = await ComplaintModel.deleteOne({ _id: id });

  return deletedComplaint;
};

export default { addComplaint, getAllComplaintPerson, deleteComplaint };

