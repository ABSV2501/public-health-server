const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    doctor_id: mongoose.Schema.Types.ObjectId,
    time: Date,
    name_of_patient: String,
    doctorname: String
});

module.exports = mongoose.model("appointments" , AppointmentSchema);
