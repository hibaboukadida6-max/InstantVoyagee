import express from "express";
import prisma from "../prisma.js";

const router = express.Router();


// Liste des réservations
router.get("/", async (req, res) => {

  try {

    const reservations = await prisma.reservation.findMany({

      include:{
        clients:true
      }

    });

    res.json(reservations);


  } catch(error){

    res.status(500).json({
      error:error.message
    });

  }

});




// Créer une réservation
router.post("/", async (req,res)=>{


  try {


    const reservation = await prisma.reservation.create({

      data:{

        title:req.body.title,

        destination:req.body.destination,

        departureDate:new Date(req.body.departureDate),

        returnDate:req.body.returnDate
          ? new Date(req.body.returnDate)
          : null,

        airline:req.body.airline,

        flightNumber:req.body.flightNumber,

        hotel:req.body.hotel,

        notes:req.body.notes

      }

    });


    res.json(reservation);


  }catch(error){


    res.status(500).json({
      error:error.message
    });


  }


});



export default router;
router.get("/:id", async (req, res) => {

  try {

    const reservation = await prisma.reservation.findUnique({

      where: {

        id: Number(req.params.id)

      },

      include: {

        clients: true

      }

    });

    res.json(reservation);

  } catch (error) {

    res.status(500).json({

      error: error.message

    });

  }

});
router.get("/list/simple", async (req, res) => {

  try {

    const reservations = await prisma.reservation.findMany({

      orderBy: {
        departureDate: "asc"
      },

      select: {
        id: true,
        title: true,
        destination: true
      }

    });

    res.json(reservations);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});