import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!user || !user.active) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET non configuré sur le serveur",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur login :", error);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
});

export default router;