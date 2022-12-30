const mongoose = require("mongoose");

const appealMsgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,     
    },
    worker_uid:{
        type: String
    },
    createdAt: {type: Date, default: Date.now}
    
});

const appealMsg = new mongoose.model("apealMsg",appealMsgSchema);


module.exports = appealMsg;