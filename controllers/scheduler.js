const express = require("express");
const router = express.Router();
const Scheduler = require("../models/scheduler.js");
const schedulesSeed = require("../seedData/data.js");


//////////////////
///// ROUTES /////
//////////////////

// index route
router.get("/", (req, res) => {
    Scheduler.find((err, allSchedules) => {
        if (err) {
            console.log(err, "- ERROR FOUND AT INDEX ROUTE")
        } else {
            res.render("index.ejs", {
                schedules: allSchedules,
            });
        }
    })
})


// check all id's
router.get("/checkID", (req, res) => {
    Scheduler.find((err, foundItems) => {
        if (err) {
            console.log(err, "- ERROR TRYING TO FIND ALL ID'S")
        } else {
            res.send(foundItems);
        }
    })
})

// seed route
router.get("/seed", (req, res) => {
    Scheduler.create(schedulesSeed, (err, data) => {
        if (err) {
            console.log(err, "- ERROR AT SEED ROUTE")
        } else {
            console.log("DATA SEEDED SUCCESSFULLY");
            res.redirect("/scheduler");
        }
    })
})

// show route
router.get("/:id", (req, res) => {
    Scheduler.findById(req.params.id, (err, foundSchedule) => {
        if (err) {
            console.log(err)
        } else {
            res.render("show.ejs", {
                schedule: foundSchedule,
            })
        }
    })
})

// delete
router.delete("/:id", (req, res) => {
    Scheduler.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            console.log(err, "- ERROR AT DELETE ROUTE")
        } else {
            res.redirect("/scheduler")
        }
    })
})


module.exports = router;