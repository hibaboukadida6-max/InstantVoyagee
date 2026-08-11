import { Routes, Route } from "react-router-dom";

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

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto p-8">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Clients */}
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/add" element={<AddClient />} />
            <Route path="/clients/edit/:id" element={<EditClient />} />
            <Route path="/clients/:id" element={<ClientDetails />} />

            {/* Payments */}
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/add" element={<AddPayment />} />

            {/* Documents */}
            <Route path="/documents" element={<Documents />} />

            {/* Passport */}
            <Route path="/passport" element={<UploadPassport />} />

            {/* Reservations */}
            <Route path="/reservations" element={<Reservations />} />
            <Route
              path="/reservations/add"
              element={<AddReservation />}
            />
            <Route
              path="/reservations/:id"
              element={<ReservationDetails />}
            />

            {/* Settings */}
            <Route path="/settings" element={<Settings />} />

            {/* Compatibilité ancienne URL */}
            <Route path="/add-client" element={<AddClient />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}