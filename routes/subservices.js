const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const subServices = require("../model/subServiceSchema");

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

// const Storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req, file , cb) =>{
//         cb(null , file.originalname);
//     },
// });

// const upload = multer ({
//     storage:Storage
// }).single('image')

// router.post('/addsubservice',(req,res)=>{
//     upload(req, res, (err)=>{
        
//         if(err){
//             console.log(err)
//         }
//         else{
//             const newSubService = new subServices({
//                 serviceName: req.body.serviceName,
//                 subServiceName:req.body.subServiceName,
//                 image:{
//                     data :req.file.filename,
//                     contentType: "image/png"
//                 },
//                 description: req.body.description
//             });
//             newSubService.save()
//             .then(()=>res.send('successfully uploaded'))
//             .catch(err=>console.log(err))
//         }
//     })
// })



const storage = multer.diskStorage({
    // destination: function(req, file, cb) {
    //     cb(null, 'images');
    // },
    destination:"uploads",
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/upload').post(upload.single('image'), (req, res) => {

    const serviceName = req.body.serviceName;
    const subServiceName = req.body.subServiceName;
    const image = req.file.filename;
    const description = req.body.description

    const newSubService = {
        serviceName,subServiceName,image,description
    }

    const addedSubService = new subServices(newSubService);

    addedSubService.save()
           .then(() => res.json('Service Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});

module.exports =router;