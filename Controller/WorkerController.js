const asyncHandler = require("express-async-handler")
const Worker = require("../Model/workerModel")
const WorkList = require("../Model/workListSchema")
const generateToken = require("../Utility/JWT-imp")

const registerWorker = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { firstname, lastname, username, email, password, confirmPassword, phoneNumber, location, profession } = req.body;

  const usernameExists = await Worker.findOne({ username });
  const emailExists = await Worker.findOne({ email });

  if (usernameExists) {
    error = "Username has already been taken"
    res.status(404).send(error);
    throw new Error(error);
  } else if (emailExists) {
    error = "An account already exists under this email"
    res.status(404).send(error);
    throw new Error(error);
  }
  else if (password !== confirmPassword) {
    error = "Passwords do not match"
    res.status(404).send(error)
    throw new Error(error)
  }
  else if (password.length < 6) {
    error = "Password must be at least 6 characters"
    res.status(404).send(error)
    throw new Error(error)
  }
  const worker = await Worker.create({
    firstname,
    lastname,
    username,
    email,
    password,
    phoneNumber,
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
  console.log(worker)
  if (worker && (await worker.matchPassword(password))) {
    res.json({
      id: worker._id,
      username: worker.username,
      email: worker.email,
      category: worker.profession,
      token: generateToken(worker._id),
    });
  } else {
    error = "Invalid Email or Password"
    res.status(401).send(error);
    throw new Error(error);
  }
});


// const updateWorkerProfile = asyncHandler(async (req, res) => {
//   console.log(req.body)
//   const worker = await Worker.findById(req.email);

//   if (worker) {
//     worker.name = req.body.name || worker.name;
//     worker.email = req.body.email || worker.email;
//     worker.phone = req.body.phoneNumber || worker.phoneNumber
//     if (req.body.password) {
//       worker.password = req.body.password;
//     }

//     const updatedworker = await worker.save();

//     res.json({
//       _id: updatedworker._id,
//       name: updatedworker.name,
//       email: updatedworker.email,
//       pic: updatedworker.pic,
//       isAdmin: updatedworker.isAdmin,
//       token: generateToken(updatedworker._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("worker Not Found");
//   }
// });

const getWorkerListOfWork = asyncHandler(async (req, res) => {
  WorkList.find({})
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

const categorizeWork = asyncHandler(async(req,res)=>{
  res.status(201)
  let category = req.params.category
  category="Plumber"
  WorkList.find({workerType: category, status:'false'})
    .then((data)=>{
      // console.log('Worker end data:', data);
      res.json(data)
    })
    .catch((error)=>{
      console.log("Error:", error)
    })
})

const acceptWork = asyncHandler(async(req,res)=>{
  const {id:work_id, uid} = req.body
  console.log("work id and worker id: ", work_id, uid)
  WorkList.findByIdAndUpdate(work_id, {status: 'true', location: 'ashina', acceptedBy: uid})
    .then((data)=>{
      console.log("Updated the status of work")
      console.log(data)
    })
    .catch((error)=>{
      console.log("Error: ", error)
    })

})

const getPendingWork = asyncHandler(async(req,res)=>{
  const uid = req.params.uid
  console.log(uid)
  WorkList.find({acceptedBy: uid, status: 'true', completed: 'false'})
    .then((data)=>{
      console.log("This is all pending work of uid", uid)
      console.log(data)
      res.json(data)
    })
    .catch((error)=>{
      console.log("Error: ", error)
      res.json(error)
    })
})

const updateWorkerProfile = asyncHandler (async (req, res) => {
  console.log("at update profile")
  try {
      const { id } = req.params;
      const updateduser = await Worker.findByIdAndUpdate(id, {
          username : req.body.username,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          image: {
              data: req.body.image,
              contentType: "image/png"
          },
          location: req.body.location
      } ,
          {
              new: true
          }
      );
      console.log(updateduser);
      res.status(201).json(updateduser);
  } catch (error) {
      res.status(422).json(error);
  }
})

module.exports = { registerWorker, authWorker, updateWorkerProfile, getWorkerListOfWork, categorizeWork, acceptWork, getPendingWork}