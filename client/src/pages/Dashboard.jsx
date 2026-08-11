import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Wallet,
  Coins,
} from "lucide-react";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    validated: 0,
    waiting: 0,
    unpaid: 0,
    totalPaid: 0,
    remaining: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

async function loadDashboard() {
  try {
    const response = await api.get("/dashboard");

    console.log("Dashboard :", response.data);

    setStats(response.data);
  } catch (error) {
    console.error("Erreur Dashboard :", error);

    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    }

    alert("Impossible de charger le tableau de bord.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div>

      <h1 className="text-3xl font-bold mb-2">
        Tableau de bord
      </h1>

      <p className="text-gray-500 mb-8">
        Bienvenue sur InstantVoyagee
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5">

        <Card
          icon={<Users />}
          title="Clients"
          value={stats.totalClients}
          color="bg-blue-600"
        />

        <Card
          icon={<CheckCircle />}
          title="Validés"
          value={stats.validated}
          color="bg-green-600"
        />

        <Card
          icon={<Clock />}
          title="En attente"
          value={stats.waiting}
          color="bg-yellow-500"
        />

        <Card
          icon={<XCircle />}
          title="Non payés"
          value={stats.unpaid}
          color="bg-red-600"
        />

        <Card
          icon={<Wallet />}
          title="Encaissement"
          value={`${stats.totalPaid} DT`}
          color="bg-purple-600"
        />

        <Card
          icon={<Coins />}
          title="Reste"
          value={`${stats.remaining} DT`}
          color="bg-orange-600"
        />

      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 mt-10">

        <h2 className="text-xl font-bold mb-6">
          Résumé
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Total des clients</span>
            <strong>{stats.totalClients}</strong>
          </div>

          <div className="flex justify-between">
            <span>Clients validés</span>
            <strong>{stats.validated}</strong>
          </div>

          <div className="flex justify-between">
            <span>Clients en attente</span>
            <strong>{stats.waiting}</strong>
          </div>

          <div className="flex justify-between">
            <span>Clients non payés</span>
            <strong>{stats.unpaid}</strong>
          </div>

          <hr />

          <div className="flex justify-between text-green-600 text-lg">
            <span>Total encaissé</span>
            <strong>{stats.totalPaid} DT</strong>
          </div>

          <div className="flex justify-between text-red-600 text-lg">
            <span>Reste à encaisser</span>
            <strong>{stats.remaining} DT</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

function Card({ icon, title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">

      <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}