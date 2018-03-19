const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
    doctor: mongoose.Schema.Types.ObjectId,
    hospital: String,
    user_id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("feedbacks" , FeedbackSchema);
