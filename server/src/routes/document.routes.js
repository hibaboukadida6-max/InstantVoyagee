import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

/* =====================================================
   GET TOUS LES DOCUMENTS
===================================================== */

router.get("/", async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(documents);
  } catch (error) {
    console.error("Erreur récupération documents :", error);

    res.status(500).json({
      success: false,
      message: "Impossible de récupérer les documents.",
    });
  }
});

/* =====================================================
   GET DOCUMENTS D'UN CLIENT
===================================================== */

router.get("/client/:clientId", async (req, res) => {
  try {
    const clientId = Number(req.params.clientId);

    if (!Number.isInteger(clientId)) {
      return res.status(400).json({
        success: false,
        message: "ID client invalide.",
      });
    }

    const documents = await prisma.document.findMany({
      where: {
        clientId,
      },
      include: {
        client: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(documents);
  } catch (error) {
    console.error("Erreur récupération documents client :", error);

    res.status(500).json({
      success: false,
      message: "Impossible de récupérer les documents du client.",
    });
  }
});

/* =====================================================
   SUPPRIMER UN DOCUMENT
===================================================== */

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "ID document invalide.",
      });
    }

    const document = await prisma.document.findUnique({
      where: {
        id,
      },
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document introuvable.",
      });
    }

    await prisma.document.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Document supprimé.",
    });
  } catch (error) {
    console.error("Erreur suppression document :", error);

    res.status(500).json({
      success: false,
      message: "Impossible de supprimer le document.",
    });
  }
});

export default router;