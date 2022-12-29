const mongoose = require("mongoose");

const workListSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true
    },
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

    acceptedBy: {
        type: String
    },

    completed:{
        type: String
    },

    createdAt: {type: Date, default: Date.now}
    
});

const WorkList = mongoose.model("WorkList",workListSchema);


module.exports = WorkList;