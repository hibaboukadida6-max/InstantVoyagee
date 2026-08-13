import { Router } from "express";
import prisma from "../prisma.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

/* =========================================================
   GET TOUS LES CLIENTS
   ========================================================= */

router.get("/", authenticateToken, async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        reservation: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(clients);
  } catch (error) {
    console.error("Erreur GET clients :", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================================================
   GET UN CLIENT
   ========================================================= */

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "ID client invalide",
      });
    }

    const client = await prisma.client.findUnique({
      where: {
        id,
      },
      include: {
        reservation: true,
      },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        error: "Client introuvable",
      });
    }

    res.json(client);
  } catch (error) {
    console.error("Erreur GET client :", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================================================
   POST NOUVEAU CLIENT
   ========================================================= */

router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      fullName,
      phone,
      whatsapp,
      email,
      address,
      nationality,
      birthDate,
      passportNumber,
      passportExpiry,
      destination,
      departureDate,
      returnDate,
      airline,
      flightNumber,
      ticketNumber,
      ticketPrice,
      amountPaid,
      notes,
      reservationId,
    } = req.body;

    if (!fullName || !destination || !departureDate) {
      return res.status(400).json({
        success: false,
        error:
          "Le nom, la destination et la date de départ sont obligatoires",
      });
    }

    const total = Number(ticketPrice || 0);
    const paid = Number(amountPaid || 0);

    const remaining = total - paid;

    let status = "NON PAYÉ";

    if (remaining <= 0) {
      status = "VALIDÉ";
    } else if (paid > 0) {
      status = "EN ATTENTE";
    }

    const client = await prisma.client.create({
      data: {
        fullName,
        phone,
        whatsapp,
        email,
        address,
        nationality,

        birthDate: birthDate ? new Date(birthDate) : null,

        passportNumber,

        passportExpiry: passportExpiry
          ? new Date(passportExpiry)
          : null,

        destination,

        departureDate: new Date(departureDate),

        returnDate: returnDate
          ? new Date(returnDate)
          : null,

        airline,
        flightNumber,
        ticketNumber,

        ticketPrice: total,
        amountPaid: paid,
        remaining,
        status,

        notes,

        reservationId: reservationId
          ? Number(reservationId)
          : null,
      },

      include: {
        reservation: true,
      },
    });

    res.status(201).json(client);
  } catch (error) {
    console.error("Erreur création client :", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================================================
   PUT MODIFIER CLIENT
   ========================================================= */

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "ID client invalide",
      });
    }

    const {
      fullName,
      phone,
      whatsapp,
      email,
      address,
      nationality,
      birthDate,
      passportNumber,
      passportExpiry,
      destination,
      departureDate,
      returnDate,
      airline,
      flightNumber,
      ticketNumber,
      ticketPrice,
      amountPaid,
      notes,
      reservationId,
    } = req.body;

    if (!fullName || !destination || !departureDate) {
      return res.status(400).json({
        success: false,
        error:
          "Le nom, la destination et la date de départ sont obligatoires",
      });
    }

    const total = Number(ticketPrice || 0);
    const paid = Number(amountPaid || 0);

    const remaining = total - paid;

    let status = "NON PAYÉ";

    if (remaining <= 0) {
      status = "VALIDÉ";
    } else if (paid > 0) {
      status = "EN ATTENTE";
    }

    const client = await prisma.client.update({
      where: {
        id,
      },

      data: {
        fullName,
        phone,
        whatsapp,
        email,
        address,
        nationality,

        birthDate: birthDate
          ? new Date(birthDate)
          : null,

        passportNumber,

        passportExpiry: passportExpiry
          ? new Date(passportExpiry)
          : null,

        destination,

        departureDate: new Date(departureDate),

        returnDate: returnDate
          ? new Date(returnDate)
          : null,

        airline,
        flightNumber,
        ticketNumber,

        ticketPrice: total,
        amountPaid: paid,
        remaining,
        status,

        notes,

        reservationId: reservationId
          ? Number(reservationId)
          : null,
      },

      include: {
        reservation: true,
      },
    });

    res.json(client);
  } catch (error) {
    console.error("Erreur modification client :", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "Client introuvable",
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================================================
   DELETE CLIENT
   ========================================================= */

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "ID client invalide",
      });
    }

    await prisma.client.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Client supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression client :", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "Client introuvable",
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;