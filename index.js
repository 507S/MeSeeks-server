const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./Model/userModel')
const bodyParser = require("body-parser")
const serviceRoute = require("./routes/services")
const subServiceRoute = require("./routes/subservices");
const bannedWorkerRoute = require("./routes/banworker");
const workerRoute = require("./routes/worker");

require("./db/conn");


// app.use(cors())
//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use(express.json());

app.use("/api/services", serviceRoute);
app.use("/api/subservices", subServiceRoute);
app.use("/api/bannedworker", bannedWorkerRoute);
app.use("/api/worker", workerRoute);
// app.use("/api/admin", workerRoute);


app.get('api/homepage', (req, res)=>{
    res.json("Welcome to the homepage of MeSeeks")
})

const userRoutes = require('./routes/userRoutes');
app.use("/api", userRoutes); 

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
// mongoose.connect('mongodb+srv://salmanjensen:sal@cluster0.yx3sl49.mongodb.net/?retryWrites=true&w=majority',
//     connectionParams,
// )
// .then(()=>console.log('connected'))
// .catch(e=>console.log(e));


const port = 1337
app.listen(port, ()=>{
    console.log(`server is running on port number ${port}`);
});