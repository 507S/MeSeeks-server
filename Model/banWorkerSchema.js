const mongoose = require("mongoose");

const bannedWorkerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,     
    },
    // banned:{
    //     type:Boolean,
    //     default: true
    // },
    bannedAt: {type: Date, default: Date.now}
    
});

const bannedWorker = new mongoose.model("bannedWorker",bannedWorkerSchema);


module.exports = bannedWorker;