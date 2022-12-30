const appealMsg = require("../../model/msg/appealMsgSchema")
// const worker = require("../model/workerModsel")
const asyncHandler = require("express-async-handler");

const sendAppealMsg = asyncHandler(async (req, res) => {
    console.log(req.body);

    const {id} = req.params;

    const name = req.body.name;
    const msg = req.body.msg;
    const worker_uid = id;


    if (!name || !msg) {
        res.status(422).json("plz fill the data");
    }
    else{
    try {
        const newMsg = new appealMsg({
            name, msg, worker_uid
        });
        await newMsg.save();
        res.status(201).json(newMsg);
        console.log(newMsg);
    } catch (error) {
        res.status(422).send(error);
    }
}
})
const getAppealMsg = asyncHandler(async(req,res) =>{
    try{
        const newMsg = await appealMsg.find();
        res.status(201).json(newMsg)
        console.log(newMsg);
    } catch(error){
        res.status(422).send(error);
    }
    })

module.exports={sendAppealMsg,getAppealMsg};