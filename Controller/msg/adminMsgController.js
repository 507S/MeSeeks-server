const adminMsg = require("../../model/msg/adminMsgSchema")
// const worker = require("../model/workerModsel")
const asyncHandler = require("express-async-handler");

const sendAdminMsg = asyncHandler(async (req, res) => {
    console.log(req.body);

    const { id, msg } = req.body;

    if (!id || !msg) {
        res.status(422).json("plz fill the data");
    }
    else{
    try {
        const newMsg = new adminMsg({
            id, msg
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
    // const {id} = req.params
    // adminMsg.find({id: id})
    // .then((data)=>{
    //     console.log(data)
    // })
    // .catch((error)=>{
    //     console.log("Error: ", error)
    // })
    try{
        const {id} = req.params;
        const newMsg = await adminMsg.find({id : id});
        res.status(201).json(newMsg)
        console.log(newMsg);
    } catch(error){
        res.status(422).send(error);
    }
    })

module.exports={sendAdminMsg,getAdminMsg};