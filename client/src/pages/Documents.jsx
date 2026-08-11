import {
  Plus,
  Search,
  FileText,
  Download,
  Trash2,
  Upload,
} from "lucide-react";

import { useState } from "react";


export default function Documents() {


  const [documents] = useState([

    {
      id:1,
      client:"Ahmed Ali",
      type:"Passeport",
      file:"passport-ahmed.pdf",
      date:"31/07/2026"
    },


    {
      id:2,
      client:"Fatma Ben Ali",
      type:"Billet avion",
      file:"ticket-fatma.pdf",
      date:"31/07/2026"
    },


  ]);




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

            Documents

          </h1>


          <p className="
            text-gray-500
          ">

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
          "

        >

          <Plus size={20}/>

          Ajouter document


        </button>


      </div>







      {/* Recherche */}


      <div className="
        bg-white
        rounded-xl
        p-4
        mb-6
        flex
        items-center
        gap-3
        shadow-sm
      ">


        <Search 
          size={20}
          className="text-gray-400"
        />


        <input

          placeholder="Rechercher document ou client..."

          className="
            outline-none
            w-full
          "

        />


      </div>








      {/* Upload rapide */}


      <div className="
        bg-blue-50
        border
        border-blue-100
        rounded-2xl
        p-6
        mb-6
        flex
        items-center
        gap-4
      ">


        <div className="
          bg-blue-900
          text-white
          p-4
          rounded-xl
        ">

          <Upload size={25}/>

        </div>



        <div>

          <h3 className="
            font-bold
          ">

            Importer un document

          </h3>


          <p className="
            text-gray-500
            text-sm
          ">

            Les vrais fichiers seront connectés au serveur prochainement

          </p>


        </div>


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

                Type

              </th>


              <th className="text-left">

                Fichier

              </th>


              <th className="text-left">

                Date

              </th>


              <th>

                Actions

              </th>


            </tr>


          </thead>





          <tbody>


          {
            documents.map((doc)=>(


              <tr

                key={doc.id}

                className="
                  border-t
                  hover:bg-gray-50
                "

              >



                <td className="p-4 font-semibold">

                  {doc.client}

                </td>



                <td>


                  <div className="
                    flex
                    items-center
                    gap-2
                  ">

                    <FileText size={18}/>

                    {doc.type}

                  </div>


                </td>



                <td>

                  {doc.file}

                </td>



                <td>

                  {doc.date}

                </td>




                <td>


                  <div className="
                    flex
                    gap-3
                  ">


                    <button className="
                      text-blue-600
                    ">

                      <Download size={18}/>

                    </button>



                    <button className="
                      text-red-600
                    ">

                      <Trash2 size={18}/>

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