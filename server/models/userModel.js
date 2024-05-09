const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        require: true,
        trim: true
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;