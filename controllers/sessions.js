/////////////////////////
////// DEPENDENCIES /////
/////////////////////////

const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

//////////////////
///// ROUTES /////
//////////////////

sessions.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
        currentUser: req.sessionStore.currentUser
    })
})

sessions.post("/", (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.render("sessions/error.ejs")
        } else if (!foundUser) {
            res.render("sessions/error.ejs")
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.sessionStore.currentUser = foundUser;
                res.redirect("/scheduler")
            } else {
                res.render("sessions/error.ejs")
            }
        }
    })
})

sessions.delete("/", (req, res) => {
    req.session.destroy(() => res.redirect("/sessions/new"))
})

module.exports = sessions;