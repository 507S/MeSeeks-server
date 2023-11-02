require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/users");

const serviceRoute = require("./routes/services")

const port = 8006;

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!').status(200);
  });

app.use("/api/services", serviceRoute);


app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
});

module.exports = app;