import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddClient() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [reservations, setReservations] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    reservationId: "",
    destination: "",
    departureDate: "",
    passportNumber: "",
    airline: "",
    ticketNumber: "",
    ticketPrice: "",
    amountPaid: "",
  });

  useEffect(() => {
    loadReservations();
  }, []);

  async function loadReservations() {
    try {
      const response = await api.get("/reservations/list/simple");
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const remaining =
    Number(form.ticketPrice || 0) -
    Number(form.amountPaid || 0);

  const status =
    remaining <= 0 && Number(form.ticketPrice) > 0
      ? "VALIDÉ"
      : Number(form.amountPaid) > 0
      ? "EN ATTENTE"
      : "NON PAYÉ";

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.destination ||
      !form.departureDate ||
      !form.ticketPrice
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/clients", {
        fullName: form.fullName,
        phone: form.phone,
        whatsapp: form.whatsapp,

        reservationId: form.reservationId
          ? Number(form.reservationId)
          : null,

        destination: form.destination,
        departureDate: form.departureDate,
        passportNumber: form.passportNumber,
        airline: form.airline,
        ticketNumber: form.ticketNumber,
        ticketPrice: Number(form.ticketPrice),
        amountPaid: Number(form.amountPaid || 0),
      });

      alert("Client ajouté avec succès.");

      setForm({
        fullName: "",
        phone: "",
        whatsapp: "",
        reservationId: "",
        destination: "",
        departureDate: "",
        passportNumber: "",
        airline: "",
        ticketNumber: "",
        ticketPrice: "",
        amountPaid: "",
      });

      navigate("/clients");

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Impossible de contacter le serveur.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      <div className="flex items-center gap-4 mb-8">

        <button
          onClick={() => navigate("/clients")}
          className="p-2 rounded-lg hover:bg-gray-200"
        >
          <ArrowLeft />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            Nouveau Client
          </h1>

          <p className="text-gray-500">
            Ajouter un voyageur InstantVoyagee
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-8"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input
            label="Nom complet *"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            label="Téléphone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            label="WhatsApp"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2 text-sm font-medium">
              Réservation
            </label>

            <select
              name="reservationId"
              value={form.reservationId}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Aucune réservation
              </option>

              {reservations.map((reservation) => (
                <option
                  key={reservation.id}
                  value={reservation.id}
                >
                  {reservation.title}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Destination *"
            name="destination"
            value={form.destination}
            onChange={handleChange}
          />

          <Input
            label="Date départ *"
            type="date"
            name="departureDate"
            value={form.departureDate}
            onChange={handleChange}
          />

          <Input
            label="Numéro passeport"
            name="passportNumber"
            value={form.passportNumber}
            onChange={handleChange}
          />

          <Input
            label="Compagnie aérienne"
            name="airline"
            value={form.airline}
            onChange={handleChange}
          />

          <Input
            label="Numéro billet"
            name="ticketNumber"
            value={form.ticketNumber}
            onChange={handleChange}
          />

          <Input
            label="Prix billet *"
            type="number"
            name="ticketPrice"
            value={form.ticketPrice}
            onChange={handleChange}
          />

          <Input
            label="Montant payé"
            type="number"
            name="amountPaid"
            value={form.amountPaid}
            onChange={handleChange}
          />

        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-5">

          <h3 className="font-bold mb-3">
            Résumé paiement
          </h3>

          <p>
            Total :
            <strong> {form.ticketPrice || 0} DT</strong>
          </p>

          <p>
            Payé :
            <strong> {form.amountPaid || 0} DT</strong>
          </p>

          <p>
            Reste :
            <strong> {remaining} DT</strong>
          </p>

          <p className="mt-2">
            Statut :
            <strong className="ml-2">
              {status}
            </strong>
          </p>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={20} />
          {loading ? "Enregistrement..." : "Enregistrer Client"}
        </button>

      </form>

    </div>
  );
}

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="block mb-2 text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}