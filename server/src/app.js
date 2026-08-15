import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import clientRoutes from "./routes/client.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";
import documentRoutes from "./routes/document.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import { authenticateToken } from "./middleware/auth.js";

const app = express();

/* =====================================================
   CHEMINS
===================================================== */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
  __dirname = server/src

  donc ../uploads = server/uploads
*/

const uploadsPath = path.join(__dirname, "../uploads");

/* =====================================================
   CORS
===================================================== */

const allowedOrigins = [
  "http://localhost:5173",

  "https://instant-voyagee-git-main-instantvoyage.vercel.app",

  "https://instant-voyagee-enz1pxnmt-instantvoyage.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (
        origin.endsWith(".vercel.app") &&
        origin.includes("instant-voyagee")
      ) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS: origine non autorisée")
      );
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

/* =====================================================
   MIDDLEWARES
===================================================== */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =====================================================
   FICHIERS UPLOADS
===================================================== */

/*
  IMPORTANT

  Permet d'ouvrir :

  /uploads/passports/fichier.pdf

  /uploads/photos/photo.jpg

  /uploads/tickets/ticket.pdf

  etc.
*/

app.use(
  "/uploads",
  express.static(uploadsPath)
);

/* =====================================================
   TEST API
===================================================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "InstantVoyagee API fonctionne correctement 🚀",
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "InstantVoyagee API",
    status: "online",
  });
});

/* =====================================================
   AUTH
===================================================== */

app.use(
  "/api/auth",
  authRoutes
);

/* =====================================================
   DOCUMENTS
===================================================== */

app.use(
  "/api/documents",
  authenticateToken,
  documentRoutes
);

/* =====================================================
   CLIENTS
===================================================== */

app.use(
  "/api/clients",
  authenticateToken,
  clientRoutes
);

/* =====================================================
   RESERVATIONS
===================================================== */

app.use(
  "/api/reservations",
  authenticateToken,
  reservationRoutes
);

/* =====================================================
   DASHBOARD
===================================================== */

app.use(
  "/api/dashboard",
  authenticateToken,
  dashboardRoutes
);

/* =====================================================
   UPLOAD
===================================================== */

app.use(
  "/api/upload",
  authenticateToken,
  uploadRoutes
);

/* =====================================================
   404
===================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route introuvable",
    path: req.originalUrl,
  });
});

/* =====================================================
   ERREUR
===================================================== */

app.use((err, req, res, next) => {
  console.error(
    "❌ Erreur serveur :",
    err
  );

  if (
    err.message?.startsWith("CORS")
  ) {
    return res.status(403).json({
      success: false,
      message: "Origine non autorisée",
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message ||
      "Erreur interne du serveur",
  });
});

export default app;