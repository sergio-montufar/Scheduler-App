const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const schedulerController = require("./controllers/scheduler.js");


require("dotenv").config();

const PORT = process.env.PORT;
const mongoDBURI = process.env.MONGODB_URI;

app.use(methodOverride("_method"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/scheduler", schedulerController);

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