const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    user_id: ObjectId,
    doctor_id: ObjectId,
    time: timestamp,
    name_of_patient: String
});

module.exports = mongoose.model("appointments" , AppointmentSchema);
