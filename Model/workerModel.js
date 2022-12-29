const mongoose = require('mongoose');

const workerSchema = mongoose.Schema({
    firstname: {type:String, required: true},
    lastname: {type:String, required: true},
    username: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    phoneNumber:{type:Number, require:true},
    rememberMe: {type:Boolean, required: false},
    token:{type: String },
    location: {type: String, required:true},
    profession: {type: String, required:true},
})

const Worker = mongoose.model("Worker", workerSchema)

module.exports = Worker;