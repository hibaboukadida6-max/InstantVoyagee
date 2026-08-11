import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function AddPayment() {


  const navigate = useNavigate();



  const [form, setForm] = useState({

    client:"",
    total:"",
    paid:"",
    method:"Espèces",
    note:""

  });




  const remaining =

    Number(form.total || 0) -
    Number(form.paid || 0);





  function handleChange(e){

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  }





  function handleSubmit(e){

    e.preventDefault();


    console.log({

      ...form,

      remaining

    });


    alert("Paiement enregistré");


    navigate("/payments");

  }





  return (

    <div>



      {/* Header */}

      <div className="
        flex
        items-center
        gap-4
        mb-8
      ">


        <button

          onClick={()=>navigate("/payments")}

          className="
            p-2
            rounded-lg
            hover:bg-gray-200
          "

        >

          <ArrowLeft/>

        </button>




        <div>


          <h1 className="
            text-3xl
            font-bold
          ">

            Nouveau Paiement

          </h1>



          <p className="
            text-gray-500
          ">

            Enregistrer un règlement client

          </p>


        </div>


      </div>








      <form

        onSubmit={handleSubmit}

        className="
          bg-white
          rounded-2xl
          shadow-sm
          p-8
          max-w-4xl
        "

      >



        <div className="
          grid
          md:grid-cols-2
          gap-6
        ">





          <Input

            label="Client"

            name="client"

            value={form.client}

            onChange={handleChange}

          />





          <Input

            label="Prix total voyage"

            type="number"

            name="total"

            value={form.total}

            onChange={handleChange}

          />






          <Input

            label="Montant payé"

            type="number"

            name="paid"

            value={form.paid}

            onChange={handleChange}

          />






          <div>


            <label className="
              block
              mb-2
              text-sm
              font-medium
            ">

              Mode paiement

            </label>



            <select

              name="method"

              value={form.method}

              onChange={handleChange}

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

            >


              <option>
                Espèces
              </option>


              <option>
                Carte bancaire
              </option>


              <option>
                Virement
              </option>



            </select>


          </div>






          <div className="md:col-span-2">


            <label className="
              block
              mb-2
              text-sm
              font-medium
            ">

              Remarque

            </label>



            <textarea

              name="note"

              value={form.note}

              onChange={handleChange}

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                h-28
              "

              placeholder="Ajouter une remarque..."

            />


          </div>



        </div>








        {/* Résumé */}


        <div className="
          mt-8
          bg-gray-50
          rounded-xl
          p-5
        ">



          <h3 className="
            font-bold
            mb-4
          ">

            Résumé

          </h3>




          <p>

            Total :
            <b>
              {" "}
              {form.total || 0} DT
            </b>

          </p>




          <p>

            Payé :
            <b>
              {" "}
              {form.paid || 0} DT
            </b>

          </p>




          <p>

            Reste :
            <b>
              {" "}
              {remaining} DT
            </b>

          </p>




        </div>








        <button

          type="submit"

          className="
            mt-8
            bg-blue-900
            text-white
            px-6
            py-3
            rounded-xl
            flex
            items-center
            gap-2
          "

        >

          <Save size={20}/>

          Enregistrer paiement


        </button>




      </form>


    </div>

  );

}







function Input({

  label,

  name,

  type="text",

  value,

  onChange

}){


  return (

    <div>


      <label className="
        block
        mb-2
        text-sm
        font-medium
      ">

        {label}

      </label>




      <input

        type={type}

        name={name}

        value={value}

        onChange={onChange}

        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
        "

      />



    </div>

  );


}