import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server/src/middleware
// ../../uploads = server/uploads
const uploadsRoot = path.join(__dirname, "../../uploads");

function storage(folder) {
  const destination = path.join(uploadsRoot, folder);

  // Créer automatiquement le dossier
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

      const filename = `${Date.now()}${ext}`;

      cb(null, filename);
    },
  });
}

export const uploadPhoto = multer({
  storage: storage("photos"),
});

export const uploadPassport = multer({
  storage: storage("passports"),
});

export const uploadTicket = multer({
  storage: storage("tickets"),
});

export const uploadVisa = multer({
  storage: storage("visas"),
});

export const uploadReceipt = multer({
  storage: storage("receipts"),
});