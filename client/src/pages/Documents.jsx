import {
  Plus,
  Search,
  FileText,
  Download,
  Trash2,
  Upload,
} from "lucide-react";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* =====================================================
     CHARGER LES DOCUMENTS
  ===================================================== */

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoading(true);

      const response = await api.get("/documents");

      setDocuments(response.data);
    } catch (error) {
      console.error(
        "Erreur chargement documents :",
        error
      );

      alert(
        error.response?.data?.message ||
          "Impossible de charger les documents."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     SUPPRIMER DOCUMENT
  ===================================================== */

  async function deleteDocument(id) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce document ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await api.delete(`/documents/${id}`);

      await loadDocuments();
    } catch (error) {
      console.error(
        "Erreur suppression document :",
        error
      );

      alert(
        error.response?.data?.message ||
          "Impossible de supprimer le document."
      );
    }
  }

  /* =====================================================
     RECHERCHE
  ===================================================== */

  const filteredDocuments = documents.filter(
    (document) => {
      const keyword = search
        .toLowerCase()
        .trim();

      if (!keyword) {
        return true;
      }

      return (
        document.client?.fullName
          ?.toLowerCase()
          .includes(keyword) ||
        document.type
          ?.toLowerCase()
          .includes(keyword) ||
        document.fileName
          ?.toLowerCase()
          .includes(keyword)
      );
    }
  );

  /* =====================================================
     TELECHARGER
  ===================================================== */

  function downloadDocument(document) {
    if (!document.filePath) {
      alert("Fichier introuvable.");
      return;
    }

    const baseUrl =
      import.meta.env.VITE_API_URL ||
      "http://localhost:5000/api";

    /*
      Ici on enlève /api pour obtenir
      l'adresse du serveur.
    */

    const serverUrl = baseUrl.replace(
      /\/api$/,
      ""
    );

    const fileUrl = `${serverUrl}/uploads/${document.filePath}`;

    window.open(fileUrl, "_blank");
  }

  /* =====================================================
     AFFICHAGE
  ===================================================== */

  return (
    <div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Documents
          </h1>

          <p className="text-gray-500 mt-2">
            Gestion des passeports et fichiers clients
          </p>
        </div>

        <button
          className="
            bg-blue-900
            text-white
            px-5
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            hover:bg-blue-800
            transition
          "
        >
          <Plus size={20} />

          Ajouter document
        </button>

      </div>

      {/* =================================================
          RECHERCHE
      ================================================= */}

      <div
        className="
          bg-white
          rounded-xl
          p-4
          mb-6
          flex
          items-center
          gap-3
          shadow-sm
        "
      >

        <Search
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Rechercher document ou client..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            outline-none
            w-full
          "
        />

      </div>

      {/* =================================================
          UPLOAD RAPIDE
      ================================================= */}

      <div
        className="
          bg-blue-50
          border
          border-blue-100
          rounded-2xl
          p-6
          mb-6
          flex
          items-center
          gap-4
        "
      >

        <div
          className="
            bg-blue-900
            text-white
            p-4
            rounded-xl
          "
        >
          <Upload size={25} />
        </div>

        <div>

          <h3 className="font-bold">
            Importer un document
          </h3>

          <p className="text-gray-500 text-sm">
            Les documents sont associés automatiquement
            au client lors de l'envoi.
          </p>

        </div>

      </div>

      {/* =================================================
          TABLEAU
      ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead
              className="
                bg-gray-50
                text-gray-500
              "
            >

              <tr>

                <th className="p-4 text-left">
                  Client
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Fichier
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {/* CHARGEMENT */}

              {loading && (
                <tr>

                  <td
                    colSpan="5"
                    className="
                      text-center
                      p-10
                      text-gray-500
                    "
                  >
                    Chargement des documents...
                  </td>

                </tr>
              )}

              {/* AUCUN DOCUMENT */}

              {!loading &&
                filteredDocuments.length === 0 && (
                  <tr>

                    <td
                      colSpan="5"
                      className="
                        text-center
                        p-10
                        text-gray-500
                      "
                    >
                      Aucun document trouvé.
                    </td>

                  </tr>
                )}

              {/* DOCUMENTS */}

              {!loading &&
                filteredDocuments.length > 0 &&
                filteredDocuments.map(
                  (document) => (
                    <tr
                      key={document.id}
                      className="
                        border-t
                        hover:bg-gray-50
                      "
                    >

                      {/* CLIENT */}

                      <td
                        className="
                          p-4
                          font-semibold
                          text-gray-800
                        "
                      >
                        {document.client?.fullName ||
                          "Client inconnu"}
                      </td>

                      {/* TYPE */}

                      <td className="p-4">

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <FileText
                            size={18}
                            className="text-blue-600"
                          />

                          {document.type}

                        </div>

                      </td>

                      {/* FICHIER */}

                      <td className="p-4">

                        <span
                          className="
                            text-gray-700
                            text-sm
                          "
                        >
                          {document.fileName}
                        </span>

                      </td>

                      {/* DATE */}

                      <td className="p-4">

                        {document.createdAt
                          ? new Date(
                              document.createdAt
                            ).toLocaleDateString(
                              "fr-FR"
                            )
                          : "-"}

                      </td>

                      {/* ACTIONS */}

                      <td className="p-4">

                        <div
                          className="
                            flex
                            justify-center
                            gap-4
                          "
                        >

                          {/* TELECHARGER */}

                          <button
                            onClick={() =>
                              downloadDocument(
                                document
                              )
                            }
                            className="
                              text-blue-600
                              hover:scale-110
                              transition
                            "
                            title="Télécharger"
                          >
                            <Download
                              size={18}
                            />
                          </button>

                          {/* SUPPRIMER */}

                          <button
                            onClick={() =>
                              deleteDocument(
                                document.id
                              )
                            }
                            className="
                              text-red-600
                              hover:scale-110
                              transition
                            "
                            title="Supprimer"
                          >
                            <Trash2
                              size={18}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =================================================
          COMPTEUR
      ================================================= */}

      {!loading && (
        <div className="mt-4 text-sm text-gray-500">
          {filteredDocuments.length} document
          {filteredDocuments.length !== 1
            ? "s"
            : ""}
        </div>
      )}

    </div>
  );
}