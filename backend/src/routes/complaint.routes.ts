import { Router } from "express";
import fileUpload from "express-fileupload";

import ComplaintController from "../controllers/complaint.controller.js";

const router = Router();

router.post(
  "/complaints",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  ComplaintController.addComplaint
);

router.put(
  "/complaints/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  ComplaintController.updateComplaint
);

router.get("/complaints/person/:id", ComplaintController.getAllComplaintPerson);

router.delete("/complaints/:id", ComplaintController.deleteComplaint);

export default router;
