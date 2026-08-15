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
   Créer un document lié au client
===================================================== */

async function createDocument({
  clientId,
  type,
  fileName,
  filePath,
}) {
  return await prisma.document.create({
    data: {
      clientId,
      type,
      fileName,
      filePath,
    },
  });
}

/* =====================================================
   PHOTO
===================================================== */

router.post(
  "/photo/:id",
  uploadPhoto.single("file"),
  async (req, res) => {
    try {
      const clientId = Number(req.params.id);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Aucun fichier envoyé.",
        });
      }

      /* Vérifier que le client existe */

      const client = await prisma.client.findUnique({
        where: {
          id: clientId,
        },
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client introuvable.",
        });
      }

      const filePath = `photos/${req.file.filename}`;

      /* Garder l'ancien champ */

      await prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          photoFile: filePath,
        },
      });

      /* Créer le document */

      const document = await createDocument({
        clientId,
        type: "Photo",
        fileName: req.file.originalname,
        filePath,
      });

      res.status(201).json({
        success: true,
        message: "Photo enregistrée.",
        document,
      });
    } catch (error) {
      console.error("Erreur upload photo :", error);

      res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement de la photo.",
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
      const clientId = Number(req.params.id);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Aucun fichier envoyé.",
        });
      }

      const client = await prisma.client.findUnique({
        where: {
          id: clientId,
        },
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client introuvable.",
        });
      }

      const filePath = `passports/${req.file.filename}`;

      /* Garder l'ancien champ */

      await prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          passportFile: filePath,
        },
      });

      /* Créer le document lié au client */

      const document = await createDocument({
        clientId,
        type: "Passeport",
        fileName: req.file.originalname,
        filePath,
      });

      res.status(201).json({
        success: true,
        message: "Passeport enregistré.",
        document,
      });
    } catch (error) {
      console.error("Erreur upload passeport :", error);

      res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement du passeport.",
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
      const clientId = Number(req.params.id);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Aucun fichier envoyé.",
        });
      }

      const client = await prisma.client.findUnique({
        where: {
          id: clientId,
        },
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client introuvable.",
        });
      }

      const filePath = `tickets/${req.file.filename}`;

      /* Garder l'ancien champ */

      await prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          ticketFile: filePath,
        },
      });

      /* Créer le document */

      const document = await createDocument({
        clientId,
        type: "Billet avion",
        fileName: req.file.originalname,
        filePath,
      });

      res.status(201).json({
        success: true,
        message: "Billet enregistré.",
        document,
      });
    } catch (error) {
      console.error("Erreur upload billet :", error);

      res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement du billet.",
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
      const clientId = Number(req.params.id);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Aucun fichier envoyé.",
        });
      }

      const client = await prisma.client.findUnique({
        where: {
          id: clientId,
        },
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client introuvable.",
        });
      }

      const filePath = `visas/${req.file.filename}`;

      /* Garder l'ancien champ */

      await prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          visaFile: filePath,
        },
      });

      /* Créer le document */

      const document = await createDocument({
        clientId,
        type: "Visa",
        fileName: req.file.originalname,
        filePath,
      });

      res.status(201).json({
        success: true,
        message: "Visa enregistré.",
        document,
      });
    } catch (error) {
      console.error("Erreur upload visa :", error);

      res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement du visa.",
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
      const clientId = Number(req.params.id);

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Aucun fichier envoyé.",
        });
      }

      const client = await prisma.client.findUnique({
        where: {
          id: clientId,
        },
      });

      if (!client) {
        return res.status(404).json({
          success: false,
          message: "Client introuvable.",
        });
      }

      const filePath = `receipts/${req.file.filename}`;

      /* Garder l'ancien champ */

      await prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          receiptFile: filePath,
        },
      });

      /* Créer le document */

      const document = await createDocument({
        clientId,
        type: "Reçu",
        fileName: req.file.originalname,
        filePath,
      });

      res.status(201).json({
        success: true,
        message: "Reçu enregistré.",
        document,
      });
    } catch (error) {
      console.error("Erreur upload reçu :", error);

      res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement du reçu.",
      });
    }
  }
);

/* =====================================================
   EXPORT
===================================================== */

export default router;