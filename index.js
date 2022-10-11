const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./Model/userModel')
const jwt = require('jsonwebtoken')


// app.use(cors())
app.use(express.json())

app.get('api/homepage', (req, res)=>{
    res.json("Welcome to the homepage of MeSeeks")
})

// app.post('/api/register', async (req,res)=>{
//     try{
//         const user = await User.create(
//             {
//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 email: req.body.email,
//                 password: req.body.password,
//                 confirmPassword: req.body.confirmPassword,
//                 checkbox: req.body.checkbox
//             }
//         )
//         res.json({status: "ok"})
//     }
//     catch(err)
//     {
//         console.log(err)
//         console.log({status: 'error', error: "Duplicate Email"})
//     }
//     res.json({status:'ok'})    
//     console.log(req.body)
// })

// app.post('/api/login', async (req,res)=>{
//     const user = await User.findOne( {
//         email: req.body.email,
//         password: req.body.password,
//     })
    
//     console.log(user)

//     if(user){

//         const token = jwt.sign(
//             {
//                 name: user.firstname,
//                 email: user.email
//             },
//             process.env.SECRET
//         )
//         return res.json({status: 'ok', user: true})
//     }
//     else{
//         return res.json({status: 'Unidentified Personnel', user: false})
//     }
// })

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