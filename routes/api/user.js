const route = require("express").Router();
const models = require("../../models/mongo/mongo");

route.get("/", (req, res) => {
    res.send("user api route");
});

//Get user's appointments
route.get("/appointment", (req,res) =>{
    console.log("User Appointments Requested",req.body.userid);
    models.appointment.find({
        user_id: req.user.id
    })
        .then((appointments) => {
            res.send(appointments);
        })
        .catch((err) => {
            console.log(err);
        })
});

//Create new appointment
route.post("/appointment/new",(req,res) => {
    models.appointment.create({
        user_id: req.user.id,
        doctor_id: req.body.doctorid,
        name_of_patient: req.body.name,
        doctorname: req.body.doctorname

    })
        .then((appoi) => {
            res.redirect(`/appointment/${appoi.id}`);
        })
    .catch((err) => {
        res.send({message: "invalid"})
        console.log(err);
    })
});

//Get appointment details
route.get("/appointment/:id", (req,res) => {
    models.appointment.findById(req.body.appid)
        .then((appointment)=>{
            res.send(appointment);
        })
        .catch((err) => {
            console.log(err);
        })
});

route.get("/user/diseasesAround", (req,res) => {
    //TODO; diseases around you
});

module.exports = route;