const mongoose = require('mongoose');

const workerSchema = mongoose.Schema({
    location: {type: String},
    expertise: {type: String},
    workExperience:{type: Number},
    currentWorkStation: {type: String}
})

const Worker = mongoose.model("Worker", workerSchema)

module.exports = Worker;