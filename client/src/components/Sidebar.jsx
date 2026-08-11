import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  CreditCard,
  FolderOpen,
  BarChart3,
  Settings,
  LogOut,
  Plane,
} from "lucide-react";


export default function Sidebar() {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Clients",
      path: "/clients",
      icon: Users,
    },
    {
      name: "Paiements",
      path: "/payments",
      icon: CreditCard,
    },
    {
      name: "Documents",
      path: "/documents",
      icon: FolderOpen,
    },
    {
      name: "Rapports",
      path: "/reports",
      icon: BarChart3,
    },
    {
      name: "Paramètres",
      path: "/settings",
      icon: Settings,
    },
  ];


  return (

    <aside className="
      w-72
      min-h-screen
      bg-blue-950
      text-white
      flex
      flex-col
    ">


      {/* Logo */}

      <div className="
        p-6
        border-b
        border-blue-900
      ">

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            bg-blue-600
            p-3
            rounded-xl
          ">

            <Plane size={28}/>

          </div>


          <div>

            <h1 className="
              text-xl
              font-bold
            ">
              InstantVoyagee
            </h1>


            <p className="
              text-xs
              text-blue-300
            ">
              Agence de Voyage
            </p>


          </div>


        </div>


      </div>




      {/* Menu */}

      <nav className="
        flex-1
        p-4
      ">


        {menuItems.map((item)=>{


          const Icon = item.icon;


          return (

            <NavLink

              key={item.path}

              to={item.path}


              className={({isActive}) => `

                flex
                items-center
                gap-4
                px-4
                py-3
                mb-2
                rounded-xl
                transition-all
                duration-200

                ${
                  isActive

                  ? 
                  "bg-white text-blue-950 shadow-lg"

                  :

                  "text-blue-100 hover:bg-blue-900"

                }

              `}


            >


              <Icon size={21}/>


              <span className="
                font-medium
              ">
                {item.name}
              </span>


            </NavLink>

          );


        })}


      </nav>





      {/* Footer Sidebar */}


      <div className="
        p-4
        border-t
        border-blue-900
      ">


        <button

          className="
            flex
            items-center
            gap-3
            w-full
            px-4
            py-3
            rounded-xl
            text-blue-200
            hover:bg-red-600
            hover:text-white
            transition
          "

        >

          <LogOut size={20}/>

          Déconnexion


        </button>


        <p className="
          text-xs
          text-center
          text-blue-400
          mt-4
        ">

          © 2026 InstantVoyagee

        </p>


      </div>


    </aside>

  );

}