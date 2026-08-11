import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import api from "../services/api";

export default function UploadPassport() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload() {
    if (!file) {
      alert("Choisissez un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("passport", file);

    try {
      setUploading(true);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedFile(response.data.path);

      alert("Passeport envoyé avec succès.");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-2">
        Importer un passeport
      </h1>

      <p className="text-gray-500 mb-8">
        Formats autorisés : PDF, JPG, PNG
      </p>

      <div className="bg-white rounded-2xl shadow-sm p-8">

        <input
          type="file"
          onChange={handleFile}
          className="mb-6"
          accept=".pdf,.jpg,.jpeg,.png"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Upload size={20} />

          {uploading ? "Envoi..." : "Envoyer le passeport"}
        </button>

        {uploadedFile && (

          <div className="mt-8 border rounded-xl p-5">

            <h3 className="font-bold mb-3">
              Fichier enregistré
            </h3>

            <a
              href={`http://localhost:5000${uploadedFile}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 flex items-center gap-2"
            >
              <FileText size={18} />
              Ouvrir le passeport
            </a>

          </div>

        )}

      </div>

    </div>
  );
}