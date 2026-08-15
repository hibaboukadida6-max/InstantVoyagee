const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const SERVER_URL =
  API_URL.replace(/\/api$/, "");
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  FileText,
  Image as ImageIcon,
  Printer,
} from "lucide-react";

import api from "../services/api";

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [files, setFiles] = useState({});

  useEffect(() => {
    loadClient();
  }, [id]);

  async function loadClient() {
    try {
      const response = await api.get(`/clients/${id}`);
      setClient(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFile(e, type) {
    setFiles({
      ...files,
      [type]: e.target.files[0],
    });
  }

  function printClient() {
    window.print();
  }

  function openWhatsapp() {
    if (!client?.whatsapp) {
      alert("Ce client n'a pas de numéro WhatsApp.");
      return;
    }

    const number = client.whatsapp.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Bonjour ${client.fullName},\n\nVoici votre billet d'avion.\n\nMerci de voyager avec InstantVoyage ✈️`
    );

    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  }

  async function upload(type) {
    if (!files[type]) {
      alert("Choisir un fichier");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[type]);

    try {
      await api.post(`/upload/${type}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Document envoyé");
      loadClient();
    } catch (error) {
      console.error(error);
      alert("Erreur upload");
    }
  }

  if (!client) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div>
      {/* CSS d'impression pour cacher les boutons sur le papier */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* En-tête */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/clients")}
          className="p-2 rounded-lg hover:bg-gray-200 no-print"
        >
          <ArrowLeft />
        </button>

        <div>
          <h1 className="text-3xl font-bold">{client.fullName}</h1>
          <p className="text-gray-500">{client.destination}</p>
        </div>
      </div>

      {/* Actions (WhatsApp & Print) */}
      <div className="mb-6 flex gap-3 no-print">
        <button
          onClick={openWhatsapp}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          📲 Ouvrir WhatsApp
        </button>

        <button
          onClick={printClient}
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
        >
          <Printer size={20} />
          Imprimer
        </button>
      </div>

      {/* Informations Voyageur */}
      <div className="bg-white rounded-2xl p-8 shadow mb-6">
        <h2 className="text-xl font-bold mb-5">Informations voyageur</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p><strong>Nom :</strong> {client.fullName}</p>
          <p><strong>Téléphone :</strong> {client.phone}</p>
          <p><strong>WhatsApp :</strong> {client.whatsapp}</p>
          <p><strong>Destination :</strong> {client.destination}</p>
          <p><strong>Départ :</strong> {client.departureDate?.slice(0, 10)}</p>
          <p><strong>Compagnie :</strong> {client.airline}</p>
          <p><strong>Billet :</strong> {client.ticketNumber}</p>
          <p><strong>Statut :</strong> {client.status}</p>
        </div>

        <hr className="my-5" />

        <h3 className="font-bold mb-2">Paiement</h3>
        <p>Prix : {client.ticketPrice} DT</p>
        <p>Payé : {client.amountPaid} DT</p>
        <p>Reste : {client.remaining} DT</p>
      </div>

      {/* Section Documents (Cachée à l'impression) */}
      <div className="bg-white rounded-2xl p-8 shadow no-print">
        <h2 className="text-xl font-bold mb-6">Documents voyageur</h2>

        <DocumentUpload
          title="Photo identité"
          type="photo"
          icon={<ImageIcon />}
          handleFile={handleFile}
          upload={upload}
          client={client}
        />
        <DocumentUpload
          title="Passeport"
          type="passport"
          icon={<FileText />}
          handleFile={handleFile}
          upload={upload}
          client={client}
        />
        <DocumentUpload
          title="Billet avion"
          type="ticket"
          icon={<FileText />}
          handleFile={handleFile}
          upload={upload}
          client={client}
        />
        <DocumentUpload
          title="Visa"
          type="visa"
          icon={<FileText />}
          handleFile={handleFile}
          upload={upload}
          client={client}
        />
        <DocumentUpload
          title="Reçu paiement"
          type="receipt"
          icon={<FileText />}
          handleFile={handleFile}
          upload={upload}
          client={client}
        />
      </div>
    </div>
  );
}

function DocumentUpload({
  title,
  type,
  icon,
  handleFile,
  upload,
  client,
}) {
  const field = `${type}File`;
  const file = client[field];

  return (
    <div className="border rounded-xl p-5 mb-4">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <strong>{title}</strong>
      </div>

      {file ? (
        <div className="mb-4">
          <p className="text-green-600">{file}</p>
          <div className="flex gap-3 mt-3">
            
             <a
  href={`${SERVER_URL}/uploads/${file}`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >

            </a>
              Ouvrir
            
            <a
  href={`${SERVER_URL}/uploads/${file}`}
              download
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Télécharger
            </a>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">Aucun document</p>
      )}

      <div className="flex gap-3 items-center">
        <input type="file" onChange={(e) => handleFile(e, type)} />
        <button
          onClick={() => upload(type)}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800"
        >
          <Upload size={18} />
          {file ? "Remplacer" : "Envoyer"}
        </button>
      </div>
    </div>
  );
}