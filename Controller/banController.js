const bannedWorker = require("../model/banWorkerSchema")
// const worker = require("../model/workerModsel")
const asyncHandler = require("express-async-handler");


const addBannedWorker = asyncHandler( async(req,res)=>{
    // console.log(req.body);

    const {name,reason} =req.body;
    // const banned = true;
    
    if(!name || !reason){
        res.status(422).json("plz fill the data");
    }
    try{
            const addBannedWorker = new bannedWorker({
                name,reason
            });

            await addBannedWorker.save();
            res.status(201).json(addBannedWorker);
            console.log(addBannedWorker);
    } catch(error){
        res.status(422).send(error);
    }
})
    const getBannedWorker = asyncHandler(async(req,res) =>{
    try{
        const userdata = await bannedWorker.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch(error){
        res.status(422).send(error);
    }
    })

    const unbanWorker = asyncHandler(async(req,res)=>{
        try{
            const {id} = req.params;

            const deletedService = await bannedWorker.findByIdAndDelete({_id:id});
            
            console.log(deletedService);
            res.status(201).json(deletedService);
        }catch(error){
            res.status(422).json(error);
        }
    })

    // const findWorker = asyncHandler(async(req,res)=>{
    //     try{
    //         const{id} = req.body;

    //         const findWorker = await worker.find({_id:id});
    //         console.log(findWorker);
    //         res.status(201).json(findWorker);
    //     }catch(error){
    //         res.status(422).json(error);
    //     }
    // })

    module.exports={addBannedWorker,getBannedWorker,unbanWorker}