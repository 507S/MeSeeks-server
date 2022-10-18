const services = require("../model/serviceSchema")

const addservice = async(req,res)=>{
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
}
const getservice = async(req,res) =>{
    try{
        const userdata = await services.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch(error){
        res.status(422).send(error);
    }
} 

module.exports ={addservice, getservice}