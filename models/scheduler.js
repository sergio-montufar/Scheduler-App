const mongoose = require("mongoose");

const schedulerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, min: Date.now(), max: "2030-12-31", required: true},
    time: {type: Date, required: true},
    color: String,
    description: String
}, {timestamps: true})

const Scheduler = mongoose.model("Scheduler", schedulerSchema)

module.exports = Scheduler;