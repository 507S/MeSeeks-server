const express = require("express");
const subServices = require("../models/subServiceSchema");
const router = express.Router();
const multer = require("multer");

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

const Storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file , cb) =>{
        cb(null , file.originalname);
    },
});

const upload = multer ({
    storage:Storage
}).single('testImage')

router.post('/upload',(req,res)=>{
    upload(req, res, (err)=>{
        
        if(err){
            console.log(err)
        }
        else{
            const newSubService = new subServices({
                serviceName: req.body.serviceName,
                subServiceName:req.body.subServiceName,
                image:{
                    data :req.file.filename,
                    contentType: "image/png"
                },
                description: req.body.description
            });
            newSubService.save()
            .then(()=>res.send('successfully uploaded'))
            .catch(err=>console.log(err))
        }
    })
})
module.exports =router;