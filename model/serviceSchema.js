const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,     
    },
    createdAt: {type: Date, default: Date.now}
    
});

const services = new mongoose.model("services",serviceSchema);


module.exports = services;