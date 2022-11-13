const mongoose = require("mongoose");

const workListSchema = new mongoose.Schema({
    workerType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    list: [
    {
        workName: {
        type: String,
        value: String
        },
        price:{
            type: String,
            value: String
        }
    }],
    status: {
        type: String,
        required: true
    },
    createdAt: {type: Date, default: Date.now}
    
});

const WorkList = mongoose.model("WorkList",workListSchema);


module.exports = WorkList;