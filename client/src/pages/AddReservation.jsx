import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft, Save } from "lucide-react";


export default function AddReservation(){

const navigate = useNavigate();


const [form,setForm]=useState({

title:"",
destination:"",
departureDate:"",
returnDate:"",
airline:"",
flightNumber:"",
hotel:"",
notes:""

});



function handleChange(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}



async function save(e){

e.preventDefault();


try{


await api.post("/reservations",form);


alert("Réservation créée");


navigate("/reservations");


}catch(error){

console.log(error);

alert("Erreur création réservation");

}


}



return (

<div>


<button
onClick={()=>navigate("/reservations")}
className="flex gap-2 mb-6"
>

<ArrowLeft/>

Retour

</button>



<h1 className="text-3xl font-bold mb-8">

Nouvelle réservation

</h1>



<form
onSubmit={save}
className="bg-white p-8 rounded-2xl shadow"
>


<div className="grid md:grid-cols-2 gap-5">


<Input
label="Nom du voyage"
name="title"
value={form.title}
onChange={handleChange}
/>


<Input
label="Destination"
name="destination"
value={form.destination}
onChange={handleChange}
/>


<Input
label="Date départ"
type="date"
name="departureDate"
value={form.departureDate}
onChange={handleChange}
/>


<Input
label="Date retour"
type="date"
name="returnDate"
value={form.returnDate}
onChange={handleChange}
/>


<Input
label="Compagnie aérienne"
name="airline"
value={form.airline}
onChange={handleChange}
/>


<Input
label="Numéro vol"
name="flightNumber"
value={form.flightNumber}
onChange={handleChange}
/>


<Input
label="Hôtel"
name="hotel"
value={form.hotel}
onChange={handleChange}
/>



</div>


<textarea

name="notes"

value={form.notes}

onChange={handleChange}

placeholder="Notes..."

className="border rounded-xl w-full mt-5 p-4"

/>



<button

className="mt-6 bg-blue-900 text-white px-6 py-3 rounded-xl flex gap-2"

>

<Save/>

Créer réservation

</button>



</form>


</div>

);


}



function Input({label,...props}){

return (

<div>

<label className="block mb-2 font-medium">

{label}

</label>


<input

{...props}

className="border rounded-xl w-full px-4 py-3"

/>


</div>

);

}