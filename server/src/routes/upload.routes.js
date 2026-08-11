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

router.post(
  "/photo/:id",
  uploadPhoto.single("file"),
  async (req, res) => {

    const client = await prisma.client.update({

      where: {
        id: Number(req.params.id),
      },

      data: {
       photoFile: `photos/${req.file.filename}`,
      },

    });

    res.json(client);

  }
);

router.post(
  "/passport/:id",
  uploadPassport.single("file"),
  async (req, res) => {

    const client = await prisma.client.update({

      where: {
        id: Number(req.params.id),
      },

      data: {
       passportFile: `passports/${req.file.filename}`,
        },

    });

    res.json(client);

  }
);

router.post(
  "/ticket/:id",
  uploadTicket.single("file"),
  async (req, res) => {

    const client = await prisma.client.update({

      where: {
        id: Number(req.params.id),
      },

      data: {
       ticketFile: `tickets/${req.file.filename}`,

        
      },

    });

    res.json(client);

  }
);

router.post(
  "/visa/:id",
  uploadVisa.single("file"),
  async (req, res) => {

    const client = await prisma.client.update({

      where: {
        id: Number(req.params.id),
      },

      data: {
        visaFile: `visas/${req.file.filename}`,
      },

    });

    res.json(client);

  }
);

router.post(
  "/receipt/:id",
  uploadReceipt.single("file"),
  async (req, res) => {

    const client = await prisma.client.update({

      where: {
        id: Number(req.params.id),
      },

      data: {
       receiptFile: `receipts/${req.file.filename}`,
      },

    });

    res.json(client);

  }
);

export default router;