const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./Model/userModel')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json())

app.get('api/homepage', (req, res)=>{
    res.json("Welcome to the homepage of MeSeeks")
})

const userRoutes = require('./routes/userRoutes');
app.use("/api", userRoutes); 

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect('mongodb+srv://salmanjensen:sal@cluster0.yx3sl49.mongodb.net/?retryWrites=true&w=majority',
    connectionParams,
)
.then(()=>console.log('connected'))
.catch(e=>console.log(e));


port = 1337
app.listen(port)
console.log(`Server has started and is listening to port: ${port}`)