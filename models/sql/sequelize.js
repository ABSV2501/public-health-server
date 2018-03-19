const Sequelize = require("sequelize");
const CONFIG = require("../../config");

//DB Configuration
const database = new Sequelize(CONFIG.SQL.DATABASE, CONFIG.SQL.USER, CONFIG.SQL.PASSWORD, {
    dialect: "mysql",
    host: CONFIG.SQL.HOST,
    logging: true
});

//Test DB Connection
database.authenticate()
    .then(() => {
        console.log("Successful connection to DB");
    })
    .catch((err) => {
        console.log("Connection Error: " + err);
        process.exit();
    });

let Users = database.import("./users.js");
Users.sync({alter:true});

module.exports = {
    Users
};