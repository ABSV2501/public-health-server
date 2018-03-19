const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    clinics: [{
        timings: timestamp,
        hospital: String
    }],
    qualification: [String],
    specialisation: String,
    fees: Number,
    experience: Number
});

module.exports = mongoose.model("doctors" , DoctorSchema);
