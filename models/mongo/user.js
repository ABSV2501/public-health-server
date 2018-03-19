const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String
    },
    age: Number,
    gender: {
        type: String,
        enum: ['m','f']
    }
});

module.exports = mongoose.model("users" , UserSchema);
