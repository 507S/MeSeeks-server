require("dotenv").config()
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const multer = require('multer')
const bodyParser = require("body-parser")
const serviceRoute = require("./routes/services")
const subServiceRoute = require("./routes/subservices")



const port = 8003;

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use(express.json());

//storage
// const Storage = multer.diskStorage({
//     destination:'upload',
//     filename:(req, file , cb) =>{
//         cb(null , file.originalName);
//     },
// });

// const upload = multer ({
//     storage :Storage
// }).single('testImage')

app.use("/api/services", serviceRoute);
app.use("/api/subservices", subServiceRoute);


app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
});