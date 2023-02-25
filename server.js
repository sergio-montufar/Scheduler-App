const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const methodOverride = require("method-override");
const schedulerController = require("./controllers/scheduler.js");
const usersController = require("./controllers/user.js");
const sessionsController = require("./controllers/sessions.js")

require("dotenv").config();

const PORT = process.env.PORT;
const mongoDBURI = process.env.MONGODB_URI;

app.use(methodOverride("_method"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    resave: false,
    saveUninitialized: false
}))

app.use("/scheduler", schedulerController);
app.use("/users", usersController);
app.use("/sessions", sessionsController);

app.get("/", (req, res) => {
    console.log("this is working!")
    res.redirect("/scheduler")
})

mongoose.connect(mongoDBURI);
mongoose.connection.once("open", () => {
    console.log("this is connected to mongo!")
})

app.listen(PORT, () => {
    console.log("This is listening!")
})