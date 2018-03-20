const route = require("express").Router();
const models = require("../../models/mongo/mongo");

//Get doctor details
route.get("/:id", (req,res) => {
    console.log("Get doc details: ", req.body.docid);
    models.doctor.findOne({
        id: req.body.docid
    })
        .then((doct) =>{
            res.send(doct);
        })
        .catch((err) => {
            console.log(err);
        })
});

//Get doctor list
route.get("/all", (req,res) => {
    models.doctor.find()
        .then((doctors) => {
            res.send(doctors);
        })
});

//Filtered doctor list
route.get("/filter", (req,res) => {
    console.log("Doctors filter");
    //TODO: filter
});





module.exports = route;