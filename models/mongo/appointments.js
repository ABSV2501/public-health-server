const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    user_id: Number,
    doctor_id: mongoose.Schema.Types.ObjectId,
    time: String,
    name_of_patient: String,
    doctorname: String
});

module.exports = mongoose.model("appointments" , AppointmentSchema);
