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

// new route
router.get("/new", (req, res) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentHour = date.getHours()
    let hourAboveCurrentHour = date.getHours() + 1;

    if (month < 10) 
        month = "0" + month;
    
    if (day < 10)
        day = "0" + day
    
    const dateOfToday = year + "-" + month + "-" + day;

    currentHour, hourAboveCurrentHour += ":00"

    res.render("new.ejs", {
        date: dateOfToday,
        hour: currentHour,
        aboveHour: hourAboveCurrentHour
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

// delete all
// router.delete("/", (req, res) => {
//     Scheduler.deleteMany({}, (err, data) => {
//         if (err) {
//             console.log(err, "- ERROR AT DELETE ALL ROUTE")
//         } else {
//             res.redirect("/scheduler")
//         }
//     })
// })


module.exports = router;