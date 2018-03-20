const mongoose = require("mongoose");

const DiseaseSchema = mongoose.Schema({
    name: String,
    symptoms: [String],
    precautions: [String]
});

module.exports = mongoose.model("disease" , DiseaseSchema);
