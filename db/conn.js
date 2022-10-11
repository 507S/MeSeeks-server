const mongoose = require("mongoose");

const DB = "mongodb+srv://acesu:iutcse@cluster0.b7f93io.mongodb.net/meseeks";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));