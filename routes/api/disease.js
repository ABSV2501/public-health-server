const route = require("express").Router();

const models = require("../../models/mongo/mongo");

// Get disease symptoms
route.post("/:id/symptoms", (req,res) => {
    models.disease.findById(req.params.id)
        .then((dis) => {
            res.send(dis.symptoms);
        })
        .catch((err) => {
            console.log(err);
        })
});

// Get disease precautions
route.get("/:id/precautions", (req,res) => {
    models.disease.findById(req.params.id)
        .then((dis) => {
            res.send(dis.precautions);
        })
        .catch((err) => {
            console.log(err);
        });
});


module.exports = route;