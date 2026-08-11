import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ReservationDetails() {

  const { id } = useParams();

  const [reservation, setReservation] = useState(null);

  useEffect(() => {

    loadReservation();

  }, []);

  async function loadReservation() {

    try {

      const response = await api.get(
        `/reservations/${id}`
      );

      setReservation(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  if (!reservation) {

    return <h2>Chargement...</h2>;

  }

  return (

    <div>

      <h1 className="text-3xl font-bold">

        {reservation.title}

      </h1>

      <p className="text-gray-500">

        {reservation.destination}

      </p>

      <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">

        <h2 className="text-xl font-bold mb-6">

          Voyageurs

        </h2>

        {reservation.clients.length === 0 ? (

          <p>Aucun client.</p>

        ) : (

          reservation.clients.map((client) => (

            <div

              key={client.id}

              className="border-b py-3"

            >

              {client.fullName}

            </div>

          ))

        )}

      </div>

    </div>

  );

}