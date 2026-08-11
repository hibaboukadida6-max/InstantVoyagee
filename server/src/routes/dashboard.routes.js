import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const totalClients = await prisma.client.count();

    const validated = await prisma.client.count({
      where: {
        status: "VALIDÉ",
      },
    });

    const waiting = await prisma.client.count({
      where: {
        status: "EN ATTENTE",
      },
    });

    const unpaid = await prisma.client.count({
      where: {
        status: "NON PAYÉ",
      },
    });

    const payments = await prisma.client.aggregate({
      _sum: {
        amountPaid: true,
        remaining: true,
      },
    });

    res.json({
      totalClients,
      validated,
      waiting,
      unpaid,
      totalPaid: payments._sum.amountPaid || 0,
      remaining: payments._sum.remaining || 0,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;