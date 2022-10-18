const services = require("../model/serviceSchema")
const asyncHandler = require("express-async-handler")

const addservice = asyncHandler( async(req,res)=>{
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
    const getservice = asyncHandler(async(req,res) =>{
    try{
        const userdata = await services.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch(error){
        res.status(422).send(error);
    }
    })

    const deleteservice = asyncHandler(async(req,res)=>{
        try{
            const {id} = req.params;
    
            // const currentservice = await services.findById({_id:id});
        
            // subServices.deleteMany({ serviceName: { $eq: currentservice.name } }).then(function(){
            //     console.log("Data deleted"); // Success
            // }).catch(function(error){
            //     console.log(error); // Failure
            // });
            const deletedService = await services.findByIdAndDelete({_id:id});
            
            console.log(deletedService);
            res.status(201).json(deletedService);
        }catch(error){
            res.status(422).json(error);
        }
    })

module.exports ={addservice, getservice, deleteservice}