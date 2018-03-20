const route = require("express").Router();

//Internal API routes
route.use("/user", require("./user"));
route.use("/doctor",require("./doctors"));
route.use("/disease", require("./disease"));




module.exports = route;