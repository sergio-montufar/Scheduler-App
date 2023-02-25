/////////////////////////
////// DEPENDENCIES /////
/////////////////////////

const express = require("express");
const users = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

//////////////////
///// ROUTES /////
//////////////////

users.get("/new", (req, res) => {
    res.render("users/new.ejs");
})

users.post("/", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        if (err) {
            console.log(err, "- ERROR TRYING TO CREATE USER")
            res.render("users/error.ejs")
        } else {
            console.log("user is created: " + createdUser);
            res.redirect("/sessions/new")
        }
    })
})

module.exports = users;