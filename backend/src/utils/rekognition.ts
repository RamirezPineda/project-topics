import fetch from "node-fetch";
import { CompareFacesCommand, DetectLabelsCommand } from "@aws-sdk/client-rekognition";

import { rekognition } from "../config/awsRekognition.js";
import { UploadedFile } from "express-fileupload";
import fs from 'fs';

const confirmFace = async (userImageFile: UploadedFile, segipImage: string) => {
  const userImageBase64 = fs.readFileSync(userImageFile.tempFilePath, "base64");
  const userImageBytes = Uint8Array.from(Buffer.from(userImageBase64, 'base64'));

  const response2 = await fetch(segipImage);
  const imageBuffer2 = await response2.arrayBuffer();
  const imageBytes2 = new Uint8Array(imageBuffer2);

  // CompareFacesRequest
  const inputParams = {
    SourceImage: {
      Bytes: userImageBytes,
    },
    TargetImage: {
      Bytes: imageBytes2,
    },
    SimilarityThreshold: 80,
  };

  // Realiza la comparación de rostros
  const command = new CompareFacesCommand(inputParams);
  const result = await rekognition.send(command);

  // Verificar los resultados
  if (result.FaceMatches && result.FaceMatches.length > 0) {
    // Se encontraron rostros similares
    console.log("El rostro de la imagen1 esta presente en la imagen2");
    return true;
  } else {
    // No se encontraron rostros similares
    console.log("El rostro de la imagen1 NO esta presente en la imagen2.");
    return false;
  }
};



const detectingLabelsInAnImage = async (typeComplaint: string, imageFile: UploadedFile) => {
  //Detecting Labels In An Image
  console.log('entro aqui', typeComplaint)
  const imageBase64 = fs.readFileSync(imageFile.tempFilePath, "base64");
  const imageBytes = Uint8Array.from(Buffer.from(imageBase64, 'base64'));

  const inputParams = {
    Image: {
      Bytes: imageBytes,
    },
    MaxLabels: 10,
  };

  const command = new  DetectLabelsCommand(inputParams);

  const result = await rekognition.send(command);
  console.log(result);

}


export { confirmFace, detectingLabelsInAnImage };
