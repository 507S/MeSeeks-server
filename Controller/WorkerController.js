const asyncHandler = require("express-async-handler")
const Worker = require("../Model/workerModel")
const generateToken = require("../Utility/JWT-imp")

const registerWorker = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, username, email, password, confirmPassword, location, profession } = req.body;

    const usernameExists = await Worker.findOne({ username });
    const emailExists = await Worker.findOne({email});
  
    if (usernameExists) {
      error="Username has already been taken"
      res.status(404).send(error);
      throw new Error(error);
    }else if(emailExists){
      error="An account already exists under this email"
      res.status(404).send(error);
      throw new Error(error);
    }
    else if(password !== confirmPassword){
      error="Passwords do not match"
      res.status(404).send(error)
      throw new Error(error)
    }
  
    const worker = await Worker.create({
        firstname,
        lastname,
        username, 
        email, 
        password, 
        location,
        profession
    });
  
    if (worker) {
      res.status(201).json({
        _id: worker._id,
        username: worker.username,
        email: worker.email,
        token: generateToken(worker._id),
      });
    } else {  
      res.status(400);
      throw new Error("Worker cannot be created");
    }
});

const authWorker = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
  
    const worker = await Worker.findOne({ email });
  
    if (worker && (await worker.matchPassword(password))) {
      res.json({
        id: worker._id,
        username: worker.username,
        email: worker.email,
        token: generateToken(worker._id),
      });
    } else {
      error = "Invalid Email or Password"
      res.status(401).send(error);
      throw new Error(error);
    }
  });

    
const updateWorkerProfile = asyncHandler(async (req, res) => {
    const worker = await Worker.findById(req.worker._id);
  
    if (worker) {
      worker.name = req.body.name || worker.name;
      worker.email = req.body.email || worker.email;
      worker.pic = req.body.pic || worker.pic;
      if (req.body.password) {
        worker.password = req.body.password;
      }
  
      const updatedworker = await worker.save();
  
      res.json({
        _id: updatedworker._id,
        name: updatedworker.name,
        email: updatedworker.email,
        pic: updatedworker.pic,
        isAdmin: updatedworker.isAdmin,
        token: generateToken(updatedworker._id),
      });
    } else {
      res.status(404);
      throw new Error("worker Not Found");
    }
  });
module.exports = {registerWorker, authWorker, updateWorkerProfile}