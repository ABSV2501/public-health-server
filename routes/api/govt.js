const route = require("express").Router();

route.get("/",(res,req) => {
    res.redirect("/govt.html");
});




module.exports = route;