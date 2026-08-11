import multer from "multer";
import path from "path";
import fs from "fs";

function storage(folder) {

  const destination = `uploads/${folder}`;

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, {
      recursive: true,
    });
  }

  return multer.diskStorage({

    destination(req, file, cb) {
      cb(null, destination);
    },

    filename(req, file, cb) {

      const ext = path.extname(file.originalname);

      cb(
        null,
        Date.now() + ext
      );

    },

  });

}

export const uploadPhoto =
  multer({
    storage: storage("photos"),
  });

export const uploadPassport =
  multer({
    storage: storage("passports"),
  });

export const uploadTicket =
  multer({
    storage: storage("tickets"),
  });

export const uploadVisa =
  multer({
    storage: storage("visas"),
  });

export const uploadReceipt =
  multer({
    storage: storage("receipts"),
  });