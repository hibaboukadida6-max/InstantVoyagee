// src/pages/Payments.jsx

import {
  Plus,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


export default function Payments() {


  const navigate = useNavigate();



  const payments = [

    {
      id: 1,
      client: "Ahmed Ali",
      destination: "Turquie",
      total: 3200,
      paid: 3200,
      remaining: 0,
      status: "PAYÉ",
    },


    {
      id: 2,
      client: "Fatma Ben Ali",
      destination: "France",
      total: 2500,
      paid: 1000,
      remaining: 1500,
      status: "PARTIEL",
    },


    {
      id: 3,
      client: "Mohamed Salah",
      destination: "Dubai",
      total: 4000,
      paid: 0,
      remaining: 4000,
      status: "NON PAYÉ",
    },

  ];





  return (

    <div>



      {/* Header */}

      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">


        <div>

          <h1 className="
            text-3xl
            font-bold
            text-gray-800
          ">

            Paiements

          </h1>


          <p className="
            text-gray-500
            mt-2
          ">

            Gestion des paiements clients InstantVoyagee

          </p>


        </div>





        <button

          onClick={() => navigate("/payments/add")}

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

          <Plus size={20}/>

          Nouveau paiement


        </button>



      </div>








      {/* Recherche */}


      <div className="
        bg-white
        rounded-xl
        p-4
        mb-6
        shadow-sm
        flex
        items-center
        gap-3
      ">


        <Search
          size={20}
          className="text-gray-400"
        />


        <input

          type="text"

          placeholder="Rechercher un client..."

          className="
            outline-none
            w-full
          "

        />


      </div>









      {/* Tableau */}


      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        overflow-hidden
      ">


        <table className="
          w-full
        ">


          <thead className="
            bg-gray-50
            text-gray-500
          ">


            <tr>


              <th className="
                p-4
                text-left
              ">
                Client
              </th>


              <th className="text-left">
                Destination
              </th>


              <th className="text-left">
                Total
              </th>


              <th className="text-left">
                Payé
              </th>


              <th className="text-left">
                Reste
              </th>


              <th className="text-left">
                Statut
              </th>


              <th className="text-left">
                Actions
              </th>


            </tr>


          </thead>






          <tbody>


            {
              payments.map((payment)=>(


                <tr

                  key={payment.id}

                  className="
                    border-t
                    hover:bg-gray-50
                  "

                >


                  <td className="p-4 font-semibold">

                    {payment.client}

                  </td>



                  <td>

                    {payment.destination}

                  </td>




                  <td>

                    {payment.total} DT

                  </td>




                  <td>

                    {payment.paid} DT

                  </td>




                  <td>

                    {payment.remaining} DT

                  </td>





                  <td>

                    <PaymentStatus 
                      status={payment.status}
                    />

                  </td>




                  <td>

                    <div className="
                      flex
                      gap-3
                    ">


                      <button
                        className="
                          text-blue-600
                        "
                      >

                        <Eye size={18}/>

                      </button>



                      <button
                        className="
                          text-green-600
                        "
                      >

                        <FileText size={18}/>

                      </button>



                    </div>

                  </td>




                </tr>


              ))
            }


          </tbody>


        </table>



      </div>



    </div>

  );

}








function PaymentStatus({status}){


  if(status === "PAYÉ"){


    return (

      <span className="
        flex
        items-center
        gap-2
        text-green-600
        font-semibold
      ">

        <CheckCircle size={18}/>

        Payé

      </span>

    );

  }





  if(status === "PARTIEL"){


    return (

      <span className="
        flex
        items-center
        gap-2
        text-yellow-600
        font-semibold
      ">

        <Clock size={18}/>

        Partiel

      </span>

    );

  }





  return (

    <span className="
      flex
      items-center
      gap-2
      text-red-600
      font-semibold
    ">

      <XCircle size={18}/>

      Non payé

    </span>

  );

}