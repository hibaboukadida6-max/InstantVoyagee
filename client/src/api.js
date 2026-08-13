import express from "express";
import cors from "cors";

import clientRoutes from "./routes/client.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import { authenticateToken } from "./middleware/auth.js";

const app = express();

/* =========================
   CORS
========================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://instant-voyagee-git-main-instantvoyage.vercel.app",
  "https://instant-voyagee-enz1pxnmt-instantvoyage.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Autoriser Postman / requêtes sans Origin
      if (!origin) {
        return callback(null, true);
      }

      // Domaines autorisés
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Previews Vercel InstantVoyagee
      if (
        origin.endsWith(".vercel.app") &&
        origin.includes("instant-voyagee")
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS: origine non autorisée"));
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   TEST API
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "InstantVoyagee API fonctionne correctement 🚀",
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "InstantVoyagee API",
    status: "online",
  });
});

/* =========================
   AUTH
   Pas besoin de JWT
========================= */

app.use("/api/auth", authRoutes);

/* =========================
   ROUTES PROTÉGÉES
   JWT obligatoire
========================= */

app.use(
  "/api/clients",
  authenticateToken,
  clientRoutes
);

app.use(
  "/api/reservations",
  authenticateToken,
  reservationRoutes
);

app.use(
  "/api/dashboard",
  authenticateToken,
  dashboardRoutes
);

app.use(
  "/api/upload",
  authenticateToken,
  uploadRoutes
);

/* =========================
   404
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route introuvable",
    path: req.originalUrl,
  });
});

/* =========================
   ERREUR GLOBALE
========================= */

app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur :", err);

  if (err.message?.startsWith("CORS")) {
    return res.status(403).json({
      success: false,
      message: "Origine non autorisée",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erreur interne du serveur",
  });
});

export default app;