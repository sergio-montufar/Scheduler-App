const mongoose = require("mongoose");

const schedulerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    first_time: {type: String, required: true},
    second_time: {type: String, required: true},
    // color: String,
    description: String
})

const Scheduler = mongoose.model("Scheduler", schedulerSchema)

module.exports = Scheduler;