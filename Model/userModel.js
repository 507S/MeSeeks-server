const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
// const {findOrCreate} = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
    firstname: {type:String, required: true},
    lastname: {type:String, required: true},
    username: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    rememberMe: {type:Boolean, required: false},
    token:{type: String },
    },
    {
        timestamps: true
    }
);

//create a model for the schema
userSchema.methods.matchPassword = async function (enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password);
};
  
  // will encrypt password everytime its saved
 userSchema.pre("save", async function (next) {
 if (!this.isModified("password")) {
     next();
}
 const salt = await bcrypt.genSalt(10);
 this.password = await bcrypt.hash(this.password, salt);
 });
  
 const User = mongoose.model("User", userSchema);
  
module.exports = User;