const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true
    },
    subServiceName: {
        type: String,
        required: true,
    },
    // image: {
    //     // data: Buffer,
    //     // contentType: String,
    //     type : String,
    //     required: true
    // },
    description: {
        type: String,
        required: true,     
    },
    
});

const subServices = new mongoose.model("subServices",subServiceSchema);


module.exports = subServices;