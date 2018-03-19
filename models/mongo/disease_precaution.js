const mongoose = require("mongoose");

const DiseasePrecautionSchema = mongoose.Schema({
    disease: String,
    precautions: [String]
});

module.exports = mongoose.model("disease_precaution" , DiseasePrecautionSchema);
