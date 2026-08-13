import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import ClientDetails from "./pages/ClientDetails";
import EditClient from "./pages/EditClient";

import Payments from "./pages/Payments";
import AddPayment from "./pages/AddPayment";

import Documents from "./pages/Documents";
import Settings from "./pages/Settings";

import UploadPassport from "./pages/UploadPassport";

import Reservations from "./pages/Reservations";
import AddReservation from "./pages/AddReservation";
import ReservationDetails from "./pages/ReservationDetails";

import Login from "./pages/Login";


function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto p-8">
          <Routes>

            {/* =========================
                DASHBOARD
            ========================= */}

            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* =========================
                CLIENTS
            ========================= */}

            <Route
              path="/clients"
              element={<Clients />}
            />

            <Route
              path="/clients/add"
              element={<AddClient />}
            />

            <Route
              path="/clients/edit/:id"
              element={<EditClient />}
            />

            <Route
              path="/clients/:id"
              element={<ClientDetails />}
            />

            {/* Ancienne URL */}
            <Route
              path="/add-client"
              element={<AddClient />}
            />

            {/* =========================
                PAYMENTS
            ========================= */}

            <Route
              path="/payments"
              element={<Payments />}
            />

            <Route
              path="/payments/add"
              element={<AddPayment />}
            />

            {/* =========================
                DOCUMENTS
            ========================= */}

            <Route
              path="/documents"
              element={<Documents />}
            />

            {/* =========================
                PASSPORT
            ========================= */}

            <Route
              path="/passport"
              element={<UploadPassport />}
            />

            {/* =========================
                RESERVATIONS
            ========================= */}

            <Route
              path="/reservations"
              element={<Reservations />}
            />

            <Route
              path="/reservations/add"
              element={<AddReservation />}
            />

            <Route
              path="/reservations/:id"
              element={<ReservationDetails />}
            />

            {/* =========================
                SETTINGS
            ========================= */}

            <Route
              path="/settings"
              element={<Settings />}
            />

            {/* =========================
                URL INCONNUE
            ========================= */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </main>
      </div>
    </div>
  );
}


export default function App() {

  return (
    <Routes>

      {/* =========================
          LOGIN
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* =========================
          APPLICATION
      ========================= */}

      <Route
        path="/*"
        element={<MainLayout />}
      />

    </Routes>
  );
}