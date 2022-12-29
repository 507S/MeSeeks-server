const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const subServices = require("../model/subServiceSchema");
const subServiceController = require("../controller/subServiceController")

// router.post("/addsubservice",async(req,res)=>{
//     console.log(req.body);

//     const {serviceName,subServiceName,description} =req.body;
    
//     if(!serviceName || !subServiceName || !description){
//         res.status(422).json("plz fill the data");
//     }
//     try{
//             const addservice = new subServices({
//                 serviceName,subServiceName,description
//             });
//             await addservice.save();
//             res.status(201).json(addservice);
//             console.log(addservice);
//     } catch(error){
//         res.status(422).send(error);
//     }
// })

const Storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file , cb) =>{
        cb(null , file.originalname);
    },
});

const upload = multer ({
    storage:Storage, limits: { fieldSize: 25 * 1024 * 1024 }
}).single('image')

router.post('/upload',upload,(req,res)=>{
    // upload(req, res, (err)=>{
        console.log(JSON.stringify(req.body))

            try{
            const newSubService = new subServices({
                serviceName: req.body.serviceName,
                subServiceName:req.body.subServiceName,
                image:{
                    data :req.body.image,
                    contentType: "image/png"
                },
                description: req.body.description
            });
            newSubService.save()
            .then(()=>res.send('successfully uploaded'))
            .catch(err=>console.log(err))
        }
        catch(error){
            console.log(error);
        }

})

// router.patch("/updateSubService/:id",async(req,res)=>{
//     try{
//         const {id} = req.params;

//         const updateduser = await subServices.findByIdAndUpdate(id,req.body,{
//             new:true
//         });
//         console.log(updateduser);
//         res.status(201).json(updateduser);
//     }catch(error){
//         res.status(422).json(error);
//     }
// });

router.patch("/updateSubService/:id",async(req,res)=>{
    try{
        const {id} = req.params;

        const updateduser = await subServices.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updateduser);
        res.status(201).json(updateduser);
    }catch(error){
        res.status(422).json(error);
    }
});

router.get('/getsubservices',subServiceController.getSubServices);

router.get('/findsubservices', subServiceController.findSubServices);

router.delete('/deletesubservice', subServiceController.deleteSubService);
// const storage = multer.diskStorage({
//     // destination: function(req, file, cb) {
//     //     cb(null, 'images');
//     // },
//     destination:"uploads",
//     filename: function(req, file, cb) {   
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// let upload = multer({ storage, fileFilter });

// router.route('/upload').post(upload.single('image'), (req, res) => {

//     console.log()

//     const serviceName = req.body.serviceName;
//     const subServiceName = req.body.subServiceName;
//     const image = req.file.filename;
//     const description = req.body.description

//     const newSubService = {
//         serviceName,subServiceName,image,description
//     }

//     const addedSubService = new subServices(newSubService);

//     addedSubService.save()
//            .then(() => res.json('Service Added'))
//            .catch(err => res.status(400).json('Error: ' + err));
// });



module.exports =router;