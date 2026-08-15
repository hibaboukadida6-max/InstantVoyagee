import { Router } from "express";

import prisma from "../prisma.js";

import {
  uploadPhoto,
  uploadPassport,
  uploadTicket,
  uploadVisa,
  uploadReceipt,
} from "../middleware/upload.js";

const router = Router();

/* =====================================================
   FONCTION COMMUNE
===================================================== */

async function saveDocument({
  clientId,
  type,
  file,
}) {
  if (!file) {
    throw new Error(
      "Aucun fichier reçu"
    );
  }

  const id = Number(clientId);

  if (Number.isNaN(id)) {
    throw new Error(
      "ID client invalide"
    );
  }

  /* Vérifier le client */

  const client =
    await prisma.client.findUnique({
      where: {
        id,
      },
    });

  if (!client) {
    const error = new Error(
      "Client introuvable"
    );

    error.status = 404;

    throw error;
  }

  /* =================================================
     CHEMIN DU FICHIER
  ================================================= */

  const filePath =
    `${type}s/${file.filename}`;

  /*
    Exemple :

    passports/1786818372980.pdf
    tickets/1786818372981.pdf
    visas/1786818372982.pdf
  */

  /* =================================================
     METTRE À JOUR LE CLIENT
  ================================================= */

  const fieldMap = {
    photo: "photoFile",
    passport: "passportFile",
    ticket: "ticketFile",
    visa: "visaFile",
    receipt: "receiptFile",
  };

  const field =
    fieldMap[type];

  if (!field) {
    throw new Error(
      "Type de document invalide"
    );
  }

  await prisma.client.update({
    where: {
      id,
    },

    data: {
      [field]: filePath,
    },
  });

  /* =================================================
     SUPPRIMER L'ANCIEN DOCUMENT DU MÊME TYPE
  ================================================= */

  await prisma.document.deleteMany({
    where: {
      clientId: id,
      type,
    },
  });

  /* =================================================
     CRÉER LE DOCUMENT
  ================================================= */

  const document =
    await prisma.document.create({
      data: {
        clientId: id,

        type,

        fileName:
          file.originalname,

        filePath,
      },

      include: {
        client: true,
      },
    });

  return document;
}

/* =====================================================
   PHOTO
===================================================== */

router.post(
  "/photo/:id",
  uploadPhoto.single("file"),

  async (req, res) => {
    try {
      const document =
        await saveDocument({
          clientId: req.params.id,
          type: "photo",
          file: req.file,
        });

      res.status(201).json({
        success: true,
        message:
          "Photo enregistrée avec succès",
        document,
      });
    } catch (error) {
      console.error(
        "Erreur upload photo :",
        error
      );

      res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Erreur upload photo",
      });
    }
  }
);

/* =====================================================
   PASSEPORT
===================================================== */

router.post(
  "/passport/:id",
  uploadPassport.single("file"),

  async (req, res) => {
    try {
      const document =
        await saveDocument({
          clientId: req.params.id,
          type: "passport",
          file: req.file,
        });

      res.status(201).json({
        success: true,
        message:
          "Passeport enregistré avec succès",
        document,
      });
    } catch (error) {
      console.error(
        "Erreur upload passeport :",
        error
      );

      res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Erreur upload passeport",
      });
    }
  }
);

/* =====================================================
   BILLET
===================================================== */

router.post(
  "/ticket/:id",
  uploadTicket.single("file"),

  async (req, res) => {
    try {
      const document =
        await saveDocument({
          clientId: req.params.id,
          type: "ticket",
          file: req.file,
        });

      res.status(201).json({
        success: true,
        message:
          "Billet enregistré avec succès",
        document,
      });
    } catch (error) {
      console.error(
        "Erreur upload billet :",
        error
      );

      res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Erreur upload billet",
      });
    }
  }
);

/* =====================================================
   VISA
===================================================== */

router.post(
  "/visa/:id",
  uploadVisa.single("file"),

  async (req, res) => {
    try {
      const document =
        await saveDocument({
          clientId: req.params.id,
          type: "visa",
          file: req.file,
        });

      res.status(201).json({
        success: true,
        message:
          "Visa enregistré avec succès",
        document,
      });
    } catch (error) {
      console.error(
        "Erreur upload visa :",
        error
      );

      res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Erreur upload visa",
      });
    }
  }
);

/* =====================================================
   REÇU
===================================================== */

router.post(
  "/receipt/:id",
  uploadReceipt.single("file"),

  async (req, res) => {
    try {
      const document =
        await saveDocument({
          clientId: req.params.id,
          type: "receipt",
          file: req.file,
        });

      res.status(201).json({
        success: true,
        message:
          "Reçu enregistré avec succès",
        document,
      });
    } catch (error) {
      console.error(
        "Erreur upload reçu :",
        error
      );

      res.status(
        error.status || 500
      ).json({
        success: false,
        message:
          error.message ||
          "Erreur upload reçu",
      });
    }
  }
);

export default router;