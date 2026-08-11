import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET Tous les clients
|--------------------------------------------------------------------------
*/

router.get("/", async (req, res) => {
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
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET Un client
|--------------------------------------------------------------------------
*/

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

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
        error: "Client introuvable",
      });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| POST Nouveau client
|--------------------------------------------------------------------------
*/

router.post("/", async (req, res) => {
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

    const total = Number(ticketPrice);
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

        reservationId:
          reservationId || null,
      },
      include: {
        reservation: true,
      },
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| PUT Modifier client
|--------------------------------------------------------------------------
*/

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

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

    const total = Number(ticketPrice);
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

        reservationId:
          reservationId || null,
      },
      include: {
        reservation: true,
      },
    });

    res.json(client);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| DELETE Client
|--------------------------------------------------------------------------
*/

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.client.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Client supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;