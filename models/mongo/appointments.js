const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    doctor_id: mongoose.Schema.Types.ObjectId,
    time: {
        type: Date,
        default: Date.now()
    },
    name_of_patient: String
});

module.exports = mongoose.model("appointments" , AppointmentSchema);
