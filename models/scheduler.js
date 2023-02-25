const mongoose = require("mongoose");

const schedulerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    allDay: {type: Boolean},
    first_time: {type: String, required: true},
    second_time: {type: String, required: true},
    // color: String,
    description: String,
    username: String
})

const Scheduler = mongoose.model("Scheduler", schedulerSchema)

module.exports = Scheduler;