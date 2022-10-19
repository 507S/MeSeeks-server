const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./Model/userModel')
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser")
const serviceRoute = require("./routes/services")
const subServiceRoute = require("./routes/subservices");
require("./db/conn");


// app.use(cors())
//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoute);
app.use("/api/subservices", subServiceRoute);

app.get('api/homepage', (req, res)=>{
    res.json("Welcome to the homepage of MeSeeks")
})


const userRoutes = require('./routes/userRoutes');
app.use("/api", userRoutes); 

// const connectionParams={
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect('mongodb+srv://salmanjensen:sal@cluster0.yx3sl49.mongodb.net/?retryWrites=true&w=majority',
//     connectionParams,
// )
// .then(()=>console.log('connected'))
// .catch(e=>console.log(e));


const port = 8003
app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
});