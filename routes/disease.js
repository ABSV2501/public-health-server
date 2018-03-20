const route = require("express").Router();

const models = require("../models/mongo/mongo");

// Get disease symptoms
route.post("/symptoms", (req,res) => {
    models.disSymp.findOne({
        disease: req.body.disease
    })
        .then((symptoms) => {
            res.send(symptoms);
        })
        .catch((err) => {
            console.log(err);
        })
});

// Get disease precautions
route.get("/precautions", (req,res) => {
    models.disPrec.findOne({
        disease: req.body.disease
    })
        .then((precautions) => {
            res.send(precautions);
        })
        .catch((err) => {
            console.log(err);
        });
});


module.exports = route;