import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import api from "../services/api";

export default function Clients() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [departureFilter, setDepartureFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      const response = await api.get("/clients");
      setClients(response.data);
    } catch (error) {
      console.error(error);
      alert("Impossible de charger les clients.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteClient(id) {
    if (!window.confirm("Supprimer ce client ?")) return;

    try {
      await api.delete(`/clients/${id}`);
      loadClients();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression.");
    }
  }

  const filteredClients = clients.filter((client) => {
    const keyword = search.toLowerCase().trim();

    const searchMatch =
      client.fullName?.toLowerCase().includes(keyword) ||
      client.phone?.toLowerCase().includes(keyword) ||
      client.whatsapp?.toLowerCase().includes(keyword) ||
      client.destination?.toLowerCase().includes(keyword);

    const dateMatch =
      departureFilter === "" ||
      client.departureDate.slice(0, 10) === departureFilter;

    return searchMatch && dateMatch;
  });

  return (
    <div>
      {/* Titre */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Clients
          </h1>

          <p className="text-gray-500 mt-2">
            Gestion des voyageurs InstantVoyagee
          </p>
        </div>

        <button
          onClick={() => navigate("/clients/add")}
          className="bg-blue-900 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-800 transition"
        >
          <Plus size={20} />
          Nouveau Client
        </button>
      </div>

      {/* Recherche + Date */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-4 items-center">

        <Search className="text-gray-400" />

        <input
          type="text"
          placeholder="Nom, téléphone, WhatsApp, destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none"
        />

        <input
          type="date"
          value={departureFilter}
          onChange={(e) => setDepartureFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <button
          onClick={() => {
            setSearch("");
            setDepartureFilter("");
          }}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Réinitialiser
        </button>

      </div>

      {/* Tableau */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="text-left p-4">Nom</th>
              <th className="text-left">Téléphone</th>
              <th className="text-left">Destination</th>
              <th className="text-left">Départ</th>
              <th className="text-left">Prix</th>
              <th className="text-left">Payé</th>
              <th className="text-left">Reste</th>
              <th className="text-left">Statut</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="9" className="text-center p-10">
                  Chargement...
                </td>
              </tr>

            ) : filteredClients.length === 0 ? (

              <tr>
                <td colSpan="9" className="text-center p-10">
                  Aucun client trouvé.
                </td>
              </tr>

            ) : (

              filteredClients.map((client) => (

                <tr
                  key={client.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {client.fullName}
                  </td>

                  <td>{client.phone || "-"}</td>

                  <td>{client.destination}</td>

                  <td>
                    {new Date(client.departureDate).toLocaleDateString("fr-FR")}
                  </td>

                  <td>{client.ticketPrice} DT</td>

                  <td>{client.amountPaid} DT</td>

                  <td>{client.remaining} DT</td>

                  <td>
                    <StatusBadge status={client.status} />
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => navigate(`/clients/${client.id}`)}
                        className="text-blue-600 hover:scale-110 transition"
                        title="Voir"
                      >
                        <Eye size={19} />
                      </button>

                      <button
                        onClick={() => navigate(`/clients/edit/${client.id}`)}
                        className="text-green-600 hover:scale-110 transition"
                        title="Modifier"
                      >
                        <Edit size={19} />
                      </button>

                      <button
                        onClick={() => deleteClient(client.id)}
                        className="text-red-600 hover:scale-110 transition"
                        title="Supprimer"
                      >
                        <Trash2 size={19} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function StatusBadge({ status }) {

  let style = "";

  switch (status) {

    case "VALIDÉ":
      style = "bg-green-100 text-green-700";
      break;

    case "EN ATTENTE":
      style = "bg-yellow-100 text-yellow-700";
      break;

    default:
      style = "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${style}`}
    >
      {status}
    </span>
  );
}