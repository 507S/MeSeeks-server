const express = require("express");
const services = require("../models/serviceSchema");
const subServices = require("../models/subServiceSchema");
const router = express.Router();

// add services
router.post("/addservice",async(req,res)=>{
    console.log(req.body);

    const {name,description} =req.body;
    
    if(!name || !description){
        res.status(422).json("plz fill the data");
    }
    try{

        const preservice = await services.findOne({name:name});
        console.log(preservice);

        if(preservice){
            res.status(422).json("this service is already present")
        }
        else{
            const addservice = new services({
                name,description
            });

            await addservice.save();
            res.status(201).json(addservice);
            console.log(addservice);
        }
    } catch(error){
        res.status(422).send(error);
    }
})

router.post("/addsubservice",async(req,res)=>{
    console.log(req.body);

    const {serviceName,subServiceName,image,description} =req.body;
    
    if(!serviceName || !subServiceName || !image || !description){
        res.status(422).json("plz fill the data");
    }
    try{
            const addservice = new subServices({
                serviceName,subServiceName,image,description
            });
            await addservice.save();
            res.status(201).json(addservice);
            console.log(addservice);
    } catch(error){
        res.status(422).send(error);
    }
})

router.get("/get-service-category", async (req, res) => {
    UserTasksModel.find({}, (data, err) => {
      if (data) {
        res.send(data);
      } else {
        res.send(err);
      }
    });
  });

module.exports =router;