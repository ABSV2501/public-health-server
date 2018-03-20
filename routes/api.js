const route = require("express").Router();

//Internal API routes
route.use("/user", require("../routes/user"));
route.use("/doctor",require("../routes/doctors"));
route.use("/disease", require("../routes/disease"));




module.exports = route;