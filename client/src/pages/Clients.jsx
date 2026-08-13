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

  // =========================
  // CHARGER LES CLIENTS
  // =========================

  async function loadClients() {
    try {
      setLoading(true);

      const response = await api.get("/clients");

      setClients(response.data);
    } catch (error) {
      console.error("Erreur chargement clients :", error);

      if (error.response?.status === 401) {
        alert("Votre session a expiré. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      alert("Impossible de charger les clients.");
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // SUPPRIMER CLIENT
  // =========================

  async function deleteClient(id) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce client ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await api.delete(`/clients/${id}`);

      // Recharger la liste
      await loadClients();
    } catch (error) {
      console.error("Erreur suppression client :", error);

      if (error.response?.status === 401) {
        alert("Votre session a expiré. Veuillez vous reconnecter.");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      alert("Erreur lors de la suppression du client.");
    }
  }

  // =========================
  // FILTRAGE
  // =========================

  const filteredClients = clients.filter((client) => {
    const keyword = search.toLowerCase().trim();

    const searchMatch =
      !keyword ||
      client.fullName?.toLowerCase().includes(keyword) ||
      client.phone?.toLowerCase().includes(keyword) ||
      client.whatsapp?.toLowerCase().includes(keyword) ||
      client.destination?.toLowerCase().includes(keyword);

    const dateMatch =
      departureFilter === "" ||
      (client.departureDate &&
        client.departureDate.slice(0, 10) === departureFilter);

    return searchMatch && dateMatch;
  });

  // =========================
  // AFFICHAGE
  // =========================

  return (
    <div>
      {/* =========================
          TITRE
      ========================= */}

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

      {/* =========================
          RECHERCHE + FILTRE
      ========================= */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-4 items-center">
        <Search className="text-gray-400" size={22} />

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
          onChange={(e) =>
            setDepartureFilter(e.target.value)
          }
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

      {/* =========================
          TABLEAU
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left p-4">
                  Nom
                </th>

                <th className="text-left p-4">
                  Téléphone
                </th>

                <th className="text-left p-4">
                  Destination
                </th>

                <th className="text-left p-4">
                  Départ
                </th>

                <th className="text-left p-4">
                  Prix
                </th>

                <th className="text-left p-4">
                  Payé
                </th>

                <th className="text-left p-4">
                  Reste
                </th>

                <th className="text-left p-4">
                  Statut
                </th>

                <th className="text-center p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {/* CHARGEMENT */}

              {loading && (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center p-10 text-gray-500"
                  >
                    Chargement des clients...
                  </td>
                </tr>
              )}

              {/* AUCUN CLIENT */}

              {!loading &&
                filteredClients.length === 0 && (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center p-10 text-gray-500"
                    >
                      Aucun client trouvé.
                    </td>
                  </tr>
                )}

              {/* CLIENTS */}

              {!loading &&
                filteredClients.length > 0 &&
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* NOM */}

                    <td className="p-4 font-medium text-gray-800">
                      {client.fullName}
                    </td>

                    {/* TELEPHONE */}

                    <td className="p-4">
                      {client.phone || "-"}
                    </td>

                    {/* DESTINATION */}

                    <td className="p-4">
                      {client.destination || "-"}
                    </td>

                    {/* DEPART */}

                    <td className="p-4">
                      {client.departureDate
                        ? new Date(
                            client.departureDate
                          ).toLocaleDateString("fr-FR")
                        : "-"}
                    </td>

                    {/* PRIX */}

                    <td className="p-4">
                      {Number(client.ticketPrice || 0).toFixed(
                        2
                      )}{" "}
                      DT
                    </td>

                    {/* PAYE */}

                    <td className="p-4">
                      {Number(client.amountPaid || 0).toFixed(
                        2
                      )}{" "}
                      DT
                    </td>

                    {/* RESTE */}

                    <td className="p-4">
                      {Number(client.remaining || 0).toFixed(
                        2
                      )}{" "}
                      DT
                    </td>

                    {/* STATUT */}

                    <td className="p-4">
                      <StatusBadge
                        status={client.status}
                      />
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        {/* VOIR */}

                        <button
                          onClick={() =>
                            navigate(
                              `/clients/${client.id}`
                            )
                          }
                          className="text-blue-600 hover:scale-110 transition"
                          title="Voir"
                        >
                          <Eye size={19} />
                        </button>

                        {/* MODIFIER */}

                        <button
                          onClick={() =>
                            navigate(
                              `/clients/edit/${client.id}`
                            )
                          }
                          className="text-green-600 hover:scale-110 transition"
                          title="Modifier"
                        >
                          <Edit size={19} />
                        </button>

                        {/* SUPPRIMER */}

                        <button
                          onClick={() =>
                            deleteClient(client.id)
                          }
                          className="text-red-600 hover:scale-110 transition"
                          title="Supprimer"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================
          COMPTEUR
      ========================= */}

      {!loading && (
        <div className="mt-4 text-sm text-gray-500">
          {filteredClients.length} client
          {filteredClients.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

// =========================
// BADGE STATUT
// =========================

function StatusBadge({ status }) {
  let style = "";

  switch (status) {
    case "VALIDÉ":
      style = "bg-green-100 text-green-700";
      break;

    case "EN ATTENTE":
      style = "bg-yellow-100 text-yellow-700";
      break;

    case "NON PAYÉ":
      style = "bg-red-100 text-red-700";
      break;

    default:
      style = "bg-gray-100 text-gray-700";
      break;
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${style}`}
    >
      {status || "INCONNU"}
    </span>
  );
}