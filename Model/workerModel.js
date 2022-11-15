const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

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

workerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
   };
     
     // will encrypt password everytime its saved
workerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
}

const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
});
const Worker = mongoose.model("Worker", workerSchema)

module.exports = Worker;