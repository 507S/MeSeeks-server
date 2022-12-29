const mongoose = require("mongoose");

const adminMsgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,     
    },
    createdAt: {type: Date, default: Date.now}
    
});

const adminMsg = new mongoose.model("adminMsg",adminMsgSchema);


module.exports = adminMsg;