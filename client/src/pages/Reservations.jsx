import { useEffect, useState } from "react";
import { Plus, Plane, Users, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Reservations() {

  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  async function loadReservations() {
    try {

      const response = await api.get("/reservations");

      setReservations(response.data);

    } catch (error) {

      console.log(error);

      alert("Impossible de charger les réservations.");

    }
  }

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Réservations
          </h1>

          <p className="text-gray-500">
            Voyages InstantVoyagee
          </p>

        </div>

        <button

          onClick={() => navigate("/reservations/add")}

          className="bg-blue-900 text-white px-5 py-3 rounded-xl flex items-center gap-2"

        >

          <Plus size={20} />

          Nouvelle réservation

        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {reservations.map((reservation) => (

          <div
            key={reservation.id}
            className="bg-white rounded-2xl shadow-sm p-6"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-xl font-bold">

                  {reservation.title}

                </h2>

                <p className="text-gray-500">

                  {reservation.destination}

                </p>

              </div>

              <Plane className="text-blue-900" />

            </div>

            <div className="mt-6 space-y-2">

              <p>

                📅 Départ :

                {" "}

                {new Date(
                  reservation.departureDate
                ).toLocaleDateString()}

              </p>

              {reservation.returnDate && (

                <p>

                  📅 Retour :

                  {" "}

                  {new Date(
                    reservation.returnDate
                  ).toLocaleDateString()}

                </p>

              )}

              <p>

                ✈️

                {" "}

                {reservation.airline || "-"}

              </p>

              <p>

                🏨

                {" "}

                {reservation.hotel || "-"}

              </p>

            </div>

            <div className="flex justify-between items-center mt-6">

              <div className="flex items-center gap-2">

                <Users size={18} />

                {reservation.clients.length} voyageurs

              </div>

              <button

                onClick={() =>
                  navigate(`/reservations/${reservation.id}`)
                }

                className="text-blue-700"

              >

                <Eye />

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}