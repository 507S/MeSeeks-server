const express = require("express");
const users = require("../model/userSchema");
const services = require("../model/serviceSchema");
const router = express.Router();


// router.get("/",(req,res) =>{
//     console.log("connect");
// });

// add services
router.post("/addservice",async(req,res)=>{
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

router.post("/register",async(req,res)=>{
    // console.log(req.body);

    const {name,email,age,mobile,work,add,desc} =req.body;
    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).json("plz fill the data");
    }
    try{

        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present")
        }
        else{
            const adduser = new users({
                name,email,age,mobile,work,add,desc
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    } catch(error){
        res.status(422).send(error);
    }
})

//get userdata

router.get("/getdata", async(req,res) =>{
    try{
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch(error){
        res.status(422).send(error);
    }
})

//getindividual user

router.get("/getuser/:id",async(req,res)=>{
    try{
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);
    }catch(error){
        res.status(404).json(error);
    }
});

//UPDATE DATA
router.patch("/updateuser/:id",async(req,res)=>{
    try{
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updateduser);
        res.status(201).json(updateduser);
    }catch(error){
        res.status(422).json(error);
    }
});

//DELETE USER
router.delete("/deleteuser/:id",async(req,res)=>{
    try{
        const {id} = req.params;

        const deleteduser = await users.findByIdAndDelete({_id:id});
        
        console.log(deleteduser);
        res.status(201).json(deleteduser);
    }catch(error){
        res.status(422).json(error);
    }
});


module.exports = router;