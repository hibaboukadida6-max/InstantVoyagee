import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import api from "../services/api";

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    destination: "",
    departureDate: "",
    passportNumber: "",
    airline: "",
    ticketNumber: "",
    ticketPrice: "",
    amountPaid: "",
  });

  useEffect(() => {
    loadClient();
  }, []);

  async function loadClient() {
    try {
      const response = await api.get(`/clients/${id}`);

      setForm({
        ...response.data,
        departureDate: response.data.departureDate?.slice(0, 10),
      });

    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {

      await api.put(`/clients/${id}`, {
        ...form,
        ticketPrice: Number(form.ticketPrice),
        amountPaid: Number(form.amountPaid),
      });

      alert("Client modifié.");

      navigate("/clients");

    } catch (error) {

      console.log(error);

      alert("Erreur.");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div>

      <div className="flex items-center gap-4 mb-8">

        <button
          onClick={() => navigate("/clients")}
          className="p-2 rounded hover:bg-gray-200"
        >
          <ArrowLeft />
        </button>

        <h1 className="text-3xl font-bold">
          Modifier Client
        </h1>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-8"
      >

        <div className="grid md:grid-cols-2 gap-5">

          <Input label="Nom" name="fullName" value={form.fullName} onChange={handleChange} />

          <Input label="Téléphone" name="phone" value={form.phone} onChange={handleChange} />

          <Input label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handleChange} />

          <Input label="Destination" name="destination" value={form.destination} onChange={handleChange} />

          <Input type="date" label="Départ" name="departureDate" value={form.departureDate} onChange={handleChange} />

          <Input label="Passeport" name="passportNumber" value={form.passportNumber} onChange={handleChange} />

          <Input label="Compagnie" name="airline" value={form.airline} onChange={handleChange} />

          <Input label="Billet" name="ticketNumber" value={form.ticketNumber} onChange={handleChange} />

          <Input type="number" label="Prix" name="ticketPrice" value={form.ticketPrice} onChange={handleChange} />

          <Input type="number" label="Payé" name="amountPaid" value={form.amountPaid} onChange={handleChange} />

        </div>

        <button
          className="mt-8 bg-blue-900 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Save size={20}/>
          {loading ? "Enregistrement..." : "Sauvegarder"}
        </button>

      </form>

    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>

      <label className="block mb-2 font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full border rounded-xl px-4 py-3"
      />

    </div>
  );
}