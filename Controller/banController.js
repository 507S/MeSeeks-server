const bannedWorker = require("../model/msg/appealMsgSchema")
// const worker = require("../model/workerModsel")
const asyncHandler = require("express-async-handler");


// const addBannedWorker = asyncHandler( async(req,res)=>{
//     // console.log(req.body);

//     const {name,reason} =req.body;
//     // const banned = true;
    
//     if(!name || !reason){
//         res.status(422).json("plz fill the data");
//     }
//     try{
//             const addBannedWorker = new bannedWorker({
//                 name,reason
//             });

//             await addBannedWorker.save();
//             res.status(201).json(addBannedWorker);
//             console.log(addBannedWorker);
//     } catch(error){
//         res.status(422).send(error);
//     }
// })
    const getBannedWorker = asyncHandler(async(req,res) =>{
    try{
        const userdata = await bannedWorker.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch(error){
        res.status(422).send(error);
    }
    })

    // const unbanWorker = asyncHandler(async(req,res)=>{
    //     const {id}=req.params;
    //     try{
        
    //         // const deletedService = await bannedWorker.deleteOne({worker_uid:id});
    //         // const deletedService = await bannedWorker.findByIdAndRemove(req.params.id.toString().trim());
    //         const deletedService = await bannedWorker.findOneAndDelete({_id:id});

    //         console.log(deletedService);
    //         res.status(201).json(deletedService);
    //     }catch(error){
    //         console.log("sesh jibon");
    //         res.status(422).json(error);
    //     }
    // })

    const unbanWorker = asyncHandler(async(req,res) =>{
        // console.log(req.body)
        const {id}=req.params;
        console.log(id)
        bannedWorker.findOneAndDelete({worker_uid: id})
          .then((doc)=>{
            console.log("removed: ", doc)
          })
          .catch((error)=>{
            console.log("remove error: ", error)
          })
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

    module.exports={getBannedWorker,unbanWorker}