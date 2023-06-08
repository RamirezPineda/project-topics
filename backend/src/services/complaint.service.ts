import CategoryModel from "../models/category.model.js";
import PersonModel from "../models/person.model.js";
import ComplaintModel from "../models/complaint.model.js";

import { Complaint } from "../interfaces/complaint.interface.js";
import { fileUploadType } from "../interfaces/fileUploadType.js";

import { itIsOfencive, validateMessage } from "../utils/verifyText.utils.js";
import { uploadMultipleImages } from "../utils/uploadImage.utils.js";

const addComplaint = async (data: Complaint, files: fileUploadType) => {
  // const person = await PersonModel.findById({ _id: data.personId });
  const category = await CategoryModel.findById({ _id: data.categoryId });

  // if (!person || !category)
  //   return { message: "La persona o categoria de denuncia no existe" };

  if (!files) return { message: "No envio fotos" };

  const currentDate = new Date();
  const initialDate = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}`;

  const complaintsOfDay = await ComplaintModel.find({
    personId: data.personId,
    createdAt: {
      $gte: new Date(initialDate),
      $lt: new Date(initialDate).setHours(23, 59, 59, 0),
    },
  });

  if (complaintsOfDay.length >= 10)
    return { message: "Alcanzo el maximo de denuncias por dia" };

  const existComplaint = complaintsOfDay.find(
    (complaint) => complaint.categoryId == data.categoryId
  );

  if (existComplaint) return { message: "Ya hizo una denuncia de este tipo" };

  let state: string | undefined = undefined;
  
  //Todo: verificar que la descripcion y titulo no contengas palabras ofencivas
  const offensiveText = await itIsOfencive(data.title, data.description);
  if (offensiveText) {
    state = "rechazado";
  }

  //Todo: verificar que las fotos sean validas

  //Todo: verificar que la descripcion y titulo sea valida (Usar ChatGPT)
  if (!offensiveText) {
    const message = await validateMessage(
      `${category?.name}`,
      data.title,
      data.description
    );

    if (!message.includes("ok")) return { message };
  }

  const photos: string[] = await uploadMultipleImages(files);

  const newComplaint = await ComplaintModel.create({
    title: data.title,
    description: data.description,
    photos,
    latitude: data.latitude,
    longitude: data.longitude,
    categoryId: data.categoryId,
    personId: data.personId,
    state,
  });

  return newComplaint;
};

const updateComplaint = async (
  id: string,
  data: Partial<Complaint>,
  files: fileUploadType
) => {
  const complaint = await ComplaintModel.findById({ _id: id });
  const category = await CategoryModel.findById({ _id: complaint!.categoryId });

  const message = await validateMessage(
    `${category?.name}`,
    `${data.title}`,
    `${data.description}`
  );

  if (!message.includes("ok")) return { message };

  // const photos: string[] = [];
  // const uploadPromises: Promise<void>[] = [];

  // for (const key in files) {
  //   const photo = files[key];
  //   const { tempFilePath } = photo as UploadedFile;

  //   const uploadPromise = uploadImage(tempFilePath).then((imageCloudinary) => {
  //     photos.push(imageCloudinary.secure_url);
  //     return fs.unlink(tempFilePath); // deleted image of storage (uploads)
  //   });

  //   uploadPromises.push(uploadPromise);
  // }

  // await Promise.all(uploadPromises); // ejecuta todas las promesas

  // if (data.photos) {
  //   data.photos = data.photos.concat(photos);
  // }

  const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
    { _id: id },
    {
      title: data.title,
      description: data.description,
      photos: data.photos,
    },
    { new: true }
  );

  return updatedComplaint;
};

const deleteComplaint = async (id: string) => {
  const deletedComplaint = await ComplaintModel.findByIdAndUpdate(
    { _id: id },
    { state: "cancelado" },
    { new: true }
  );

  return deletedComplaint;
};

const getAllComplaintPerson = async (personId: string) => {
  const allComplaints = await ComplaintModel.find({ personId }).sort({
    createdAt: -1,
  });

  return allComplaints;
};

export default {
  addComplaint,
  getAllComplaintPerson,
  deleteComplaint,
  updateComplaint,
};
