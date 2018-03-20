const mongoose = require("mongoose");

const MedHistSchema = mongoose.Schema({
    user_id: Number,
    specialisation: [String]
});

module.exports = mongoose.model("medical_history" , MedHistSchema);
