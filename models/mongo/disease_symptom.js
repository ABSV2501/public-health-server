const mongoose = require("mongoose");

const DiseaseSymptomSchema = mongoose.Schema({
    disease: String,
    symptoms: [String]
});

module.exports = mongoose.model("disease_symptom" , DiseaseSymptomSchema);
