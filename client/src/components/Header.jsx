import {
  Search,
  Bell,
  UserCircle,
} from "lucide-react";


export default function Header() {

  return (

    <header className="
      h-20
      bg-white
      border-b
      flex
      items-center
      justify-between
      px-8
    ">


      {/* Recherche */}

      <div className="
        flex
        items-center
        bg-gray-100
        rounded-xl
        px-4
        py-2
        w-96
      ">

        <Search 
          size={20}
          className="text-gray-500"
        />


        <input

          type="text"

          placeholder="Rechercher un client..."

          className="
            bg-transparent
            outline-none
            ml-3
            w-full
            text-sm
          "

        />


      </div>





      {/* Partie droite */}

      <div className="
        flex
        items-center
        gap-6
      ">


        {/* Notifications */}

        <button
          className="
            relative
            text-gray-600
            hover:text-blue-700
          "
        >

          <Bell size={24}/>


          <span className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            text-xs
            w-5
            h-5
            rounded-full
            flex
            items-center
            justify-center
          ">

            3

          </span>


        </button>





        {/* Utilisateur */}

        <div className="
          flex
          items-center
          gap-3
        ">


          <UserCircle 
            size={38}
            className="text-blue-900"
          />


          <div>


            <p className="
              font-semibold
              text-gray-800
            ">

              Admin

            </p>


            <p className="
              text-xs
              text-gray-500
            ">

              InstantVoyagee

            </p>


          </div>


        </div>



      </div>


    </header>

  );

}