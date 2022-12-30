const subServices = require('../model/subServiceSchema')
const asyncHandler = require('express-async-handler')

const getSubServices = asyncHandler( async(req,res)=>{
    try{
        const subService = await subServices.find();
        res.status(201).json(subService)
        // console.log(subService)
    }catch(error){
        res.status(422).send(error);
    }
})


const findSubServices = asyncHandler(async (req,res)=>{
    try{
        const {category} = req.body;
        const subServices = await subServices.find({serviceName :{ $eq : category}});
        res.status(201).json(subServices);
    }catch(error){
        res.status(422).send(error);
    }
})

const deleteSubService = asyncHandler( async(req,res) =>{
    try{
        const {id} = req.params;
        const deletedSubService = await subServices.findByIdAndDelete({_id:id});
        res.status(201).json(deletedSubService);
    }catch(error){
        // console.log("sesh jibon");
        res.status(422).send(error);
    }
})
module.exports ={getSubServices, findSubServices, deleteSubService}