const route = require("express").Router();
const models = require("../models/mongo/mongo");

route.get("/", (req, res) => {
    res.send("info");
});

//Get user's appointments
route.post("/appointment", (req,res) =>{
    console.log("User Appointments Requested",req.body.userid);
    models.appointment.find({
        user_id: req.body.userid //TODO: userid
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
        user_id: req.user.userid,
        doctor_id: req.body.doctorid,
        name_of_patient: req.body.name

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

module.exports = route;