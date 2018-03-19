const mongoose = require("mongoose");

const MedHistSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    specialisation: [String]
});

module.exports = mongoose.model("medical_history" , MedHistSchema);
