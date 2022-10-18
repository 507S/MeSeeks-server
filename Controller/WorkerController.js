const asyncHandler = require("express-async-handler")
const Worker = require("../Model/workerModel")

const workerInfo = asyncHandler(async(req, res)=>{
    const {location, expertise, workExperience, currentWorkStation} = req.body

    const locationExists = await Worker.findOne({location})

    if(locationExists)
   {
            res.status(200)
            console.log(req.body)
    }
    else{
        console.log("at controller")
        error="Body not found"
        res.status(401).send(error)
        throw new Error(error)
    }
       
})

module.exports = {workerInfo}