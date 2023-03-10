/////////////////////////
////// DEPENDENCIES /////
/////////////////////////

const express = require("express");
const router = express.Router();
const Scheduler = require("../models/scheduler.js");
const schedulesSeed = require("../seedData/data.js");
const isAuthenticated = require("../utils/middleware.js");

router.use(isAuthenticated);

//////////////////
///// ROUTES /////
//////////////////

// index route
router.get("/", (req, res) => {
    Scheduler.find({username: req.session.currentUser.username}, (err, allSchedules) => {
        if (err) {
            console.log(err, "- ERROR FOUND AT INDEX ROUTE")
        } else {
            console.log(allSchedules)
            res.render("index.ejs", {
                schedules: allSchedules,
                currentUser: req.session.currentUser
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
    let hour = date.getHours();
    let hourPlusOne = hour + 1;

    if (month < 10) 
        month = "0" + month;
    
    if (day < 10)
        day = "0" + day

    if (hour < 10) 
        hour = "0" + hour;

    if (hourPlusOne < 10)
        hourPlusOne = "0" + hourPlusOne
    

    const dateOfToday = year + "-" + month + "-" + day;
    const currentHour = hour + ":00"
    const hourAbove = hourPlusOne + ":00"

    res.render("new.ejs", {
        date: dateOfToday,
        hour1: currentHour,
        hour2: hourAbove,
        currentUser: req.session.currentUser
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
                currentUser: req.session.currentUser
            })
        }
    })
})

// edit route
router.get("/:id/edit", (req, res) => {
    Scheduler.findById(req.params.id, (err, foundSchedule) => {
        if (err) {
            console.log(err, "- ERROR AT EDIT ROUTE")
        } else {
            console.log(foundSchedule);
            res.render("edit.ejs", {
                schedule: foundSchedule,
                currentUser: req.session.currentUser
            })
        }
    })
})


// post route 
router.post("/", (req, res) => {
    if (req.body.all_day === "on") {
        req.body.all_day = true
    } else {
        req.body.all_day = false
    }
    console.log(req.body)
    Scheduler.create(req.body, (err, createdSchedule) => {
        if (err) {
            console.log(err, "- ERROR AT POST ROUTE")
            res.send(err)
        } else {
            res.redirect("/scheduler")
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

// put route
router.put("/:id", (req, res) => {
    console.log(req.body)
    if (req.body.all_day === "on") {
        req.body.all_day = true
    } else {
        req.body.all_day = false
    }
    Scheduler.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedSchedule) => {
        if (err) {
            console.log(err, "- ERROR AT PUT ROUTE")
        } else {
            res.redirect("/scheduler/" + req.params.id)
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