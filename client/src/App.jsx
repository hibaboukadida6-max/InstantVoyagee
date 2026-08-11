import UploadPassport from "./pages/UploadPassport";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ClientDetails from "./pages/ClientDetails";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Payments from "./pages/Payments";
import Documents from "./pages/Documents";
import EditClient from "./pages/EditClient";
import Settings from "./pages/Settings";
import AddClient from "./pages/AddClient";
import Reservations from "./pages/Reservations";
import AddReservation from "./pages/AddReservation";
import ReservationDetails from "./pages/ReservationDetails";
import AddPayment from "./pages/AddPayment";
export default function App() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <Header />

        {/* Pages */}
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-client" element={<AddClient />} 
 path="/clients/add" 
 element={<AddClient />} 
/>
<Route 
 path="/clients/:id" 
 element={<ClientDetails />} 
/>
<Route 
 path="/payments/add" 
 element={<AddPayment />} 
/>
<Route
  path="/passport"
  element={<UploadPassport />}
/>
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
<Route
  path="/clients/edit/:id"
  element={<EditClient />}
/>


          </Routes>
        </main>

      </div>
    </div>
  );
}