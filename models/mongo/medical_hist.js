const mongoose = require("mongoose");

const MedHistSchema = mongoose.Schema({
    user_id: ObjectId,
    specialisation: [String]
});

module.exports = mongoose.model("medical_history" , MedHistSchema);
