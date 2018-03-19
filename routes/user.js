const route = require("express").Router();
const models = require("../models/mongo/mongo");

route.get("/", (req, res) => {
    res.send("info");
});

route.get("/appointment", (req,res) =>{
    models.appointment.findOne({
        user_id: req.user.id
    })
})

module.exports = route;