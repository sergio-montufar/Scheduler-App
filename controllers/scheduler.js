const express = require("express");
const router = express.Router();
const Scheduler = require("../models/scheduler.js");
const schedulesSeed = require("../seedData/data.js");




//////////////////
///// ROUTES /////
//////////////////

// index route
router.get("/", (req, res) => {
    Scheduler.find((err, schedules) => {
        if (err) {
            console.log(err, "- ERROR FOUND AT INDEX ROUTE")
        } else {
            res.send("this is working");
        }
    })
})

// seed route
router.get("/seed", (req, res) => {
    Scheduler.create(schedulesSeed, (err, data) => {
        if (err) {
            console.log(err, "- ERROR AT SEED ROUTE")
        } else {
            console.log("DATA SEEDED SUCCESSFULLY")
            res.redirect("/scheduler");
        }
    })
})

module.exports = router;