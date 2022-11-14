require("dotenv").config()
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const multer = require('multer')
const bodyParser = require("body-parser")
const serviceRoute = require("./routes/services")
const subServiceRoute = require("./routes/subservices");

const router = require("./routes/services");



const port = 1337;

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoute);
app.use("/api/subservices", subServiceRoute);



app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
});