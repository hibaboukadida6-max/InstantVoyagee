import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import clientRoutes from "./routes/client.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);

app.get("/", (req, res) => {
  res.json({
    application: "InstantVoyagee API",
    version: "1.0.0",
    status: "OK",
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/upload", uploadRoutes);

export default app;