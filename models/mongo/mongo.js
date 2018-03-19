//Import the mongoose module
const mongoose = require("mongoose");
const CONFIG = require("../../config");

//Import DB Models
const users = require("./user");
const doctor = require("./doctor");
const appointment = require("./appointments");
const feedback = require("./feedback");
const hist = require("./medical_hist");
const disPrec = require("./disease_precaution");
const disSymp = require("./disease_symptom");


mongoose.connect(`mongodb://${CONFIG.MONGO.HOST}:${CONFIG.MONGO.PORT}/${CONFIG.MONGO.DB_NAME}`).then(()=>{
    console.log("Successful connection to MongoDB");
})
    .catch((err)=>{
        console.log("Mongoose connection error due to: ",err);
        process.exit();
    });

mongoose.Promise = global.Promise;

//Expose the models for using elsewhere
module.exports = {
    users,doctor,appointment,feedback,hist,disPrec,disSymp
};
