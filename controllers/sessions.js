const bcrypt = require("bcrypt");
const express = require("express");
const session = require("express-session");
const sessions = express.Router();
const User = require("../models/users.js");


sessions.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
        currentUser: req.session.currentUser
    })
})

sessions.post("/", (req, res) => {
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.send("Sorry, username and password not found.")
        } else if (!foundUser) {
            res.send("Sorry, username and password not found.")
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect("/scheduler")
            } else {
                res.send("Sorry, username and password not found.")
            }
        }
    })
})

sessions.delete("/", (req, res) => {
    req.session.destroy(() => res.redirect("/sessions/new"))
})