const adminMsg = require("../../model/msg/adminMsgSchema")
// const worker = require("../model/workerModsel")
const asyncHandler = require("express-async-handler");

const sendAdminMsg = asyncHandler(async (req, res) => {
    console.log(req.body);

    const { name, msg } = req.body;

    if (!name || !msg) {
        res.status(422).json("plz fill the data");
    }
    else{
    try {
        const newMsg = new adminMsg({
            name, msg
        });
        await newMsg.save();
        res.status(201).json(newMsg);
        console.log(newMsg);
    } catch (error) {
        res.status(422).send(error);
    }
}
})
const getAdminMsg = asyncHandler(async(req,res) =>{
    try{
        const newMsg = await adminMsg.find();
        res.status(201).json(newMsg)
        console.log(newMsg);
    } catch(error){
        res.status(422).send(error);
    }
    })

module.exports={sendAdminMsg,getAdminMsg};