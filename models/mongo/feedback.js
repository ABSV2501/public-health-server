const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
    doctor: ObjectId,
    hospital: String,
    user_id: ObjectId,
});

module.exports = mongoose.model("feedbacks" , FeedbackSchema);
