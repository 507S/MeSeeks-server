const express = require("express");
const services = require("../models/serviceSchema");
const subServices = require("../models/subServiceSchema");
const router = express.Router();

// add services
router.post("/addservice",async(req,res)=>{
    console.log(req.body);
    console.log("THIS IS REQ BODY")

    const {name,description} =req.body;
    
    if(!name || !description){
        res.status(422).json("plz fill the data");
    }
    try{

        const preservice = await services.findOne({name:name});
        // console.log(preservice);
        // console.log("THIS IS PRESERVICES=")

        if(preservice){
            error="this service is already present"
            res.status(422).json(error)
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

router.get("/getservice", async(req,res) =>{
    try{
        const userdata = await services.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch(error){
        res.status(422).send(error);
    }
})
router.get("/getservice",async(req,res)=>{
    try{
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await services.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);
    }catch(error){
        res.status(404).json(error);
    }
});

// router.post("/addsubservice",async(req,res)=>{
//     console.log(req.body);

//     const {serviceName,subServiceName,image,description} =req.body;
    
//     if(!serviceName || !subServiceName || !image || !description){
//         res.status(422).json("plz fill the data");
//     }
//     try{
//             const addservice = new subServices({
//                 serviceName,subServiceName,image,description
//             });
//             await addservice.save();
//             res.status(201).json(addservice);
//             console.log(addservice);
//     } catch(error){
//         res.status(422).send(error);
//     }
// })

module.exports =router;