const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    subServiceName: {
        type: String,
        required: true,
    },
    image: {
        data: String,
        contentType: String,
        // type : String,
        // required: true
    },
    description: {
        type: String,
        required: true,     
    },
    createdAt: {type: Date, default: Date.now}
    
});

const subServices = new mongoose.model("subServices",subServiceSchema);


module.exports = subServices;