const asyncHandler = require("express-async-handler")
const User = require("../Model/userModel")
const generateToken = require("../Utility/JWT-imp");
const WorkList = require("../Model/workListSchema")
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { firstname, lastname, username, email, password, confirmPassword } = req.body;

  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });

  if (usernameExists) {
    error = "Username has already been taken"
    res.status(404).send(error);
    throw new Error(error);
  } else if (emailExists) {
    error = "An account already exists under this email"
    res.status(404).send(error);
    throw new Error(error);
  }
  else if (password.length < 6) {
    error = "Your password needs a minimum of Six characters"
    res.status(404).send(error);
    throw new Error(error);
  } else if (password.search(/[a-z]/) < 0) {
    error = "Your password needs a lower case letter"
    res.status(404).send(error);
    throw new Error(error);
  } else if(password.search(/[A-Z]/) < 0) {
    error = "Your password needs an uppser case letter"
    res.status(404).send(error);
    throw new Error(error);
  } else  if (password.search(/[0-9]/) < 0) {
    error = "Your password needs a number"
    res.status(404).send(error);
    throw new Error(error);
  }



  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User cannot be created");
  }
});

const authUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    error = "Invalid Email or Password"
    res.status(401).send(error);
    throw new Error(error);
  }
});

const reserveUser = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: 'you are authorized' })
})

const logoutUser = asyncHandler(async (req, res) => {
  localStorage.clear();
})

const scheduleAppointment = asyncHandler(async (req, res) => {
  const { workerType, location, address, phone, uid } = req.body.formData
  const status = false
  let list = req.body.workList

  console.log(list)
  console.log("***********")
  let acceptedBy = null
  let completed = 'false'
  const workListModel = await WorkList.create({
    uid,
    workerType,
    location,
    address,
    phone,
    list,
    status,
    acceptedBy,
    completed
  })
  console.log(workListModel)

  res.status(200).end()
})

const getListOfWork = asyncHandler(async (req, res) => {
  let uid = req.params.uid
  // console.log("*******this is uid-**************")
  // console.log(uid)
  WorkList.find({uid})
    .then((data) => {
      // console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

const deleteWork = asyncHandler(async(req,res) =>{
  // console.log(req.body)
  let id = req.body.id
  console.log(id)
  WorkList.findOneAndDelete({_id: id})
    .then((doc)=>{
      console.log("removed: ", doc)
    })
    .catch((error)=>{
      console.log("remove error: ", error)
    })
})

const completeWork = asyncHandler(async(req,res)=>{
  const {id:work_id, uid} = req.body
  console.log("here at complete work", work_id)
  WorkList.findByIdAndUpdate(work_id, {completed: 'true', status: 'true'})
    .then((data)=>{
      console.log("This work is completed:")
      console.log(data)
    })
    .catch((error)=>{
      console.log("Error: ", error)
    })
})

const ugetPendingWork = asyncHandler(async(req,res)=>{
  const uid = req.params.uid
  console.log(uid)
  WorkList.find({uid, status: 'true', completed: 'false'})
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

const ugetCompletedWork = asyncHandler(async(req,res)=>{
  const uid = req.params.uid
  console.log("this is uid latest", uid)

  WorkList.find({uid, status: 'true', completed: 'true'})
    .then((data)=>{
      console.log("This is all completed work of uid", uid)
      console.log(data)
      res.json(data)
    })
    .catch((error)=>{
      console.log("Error: ", error)
      res.json(error)
    })
})


module.exports = { registerUser, authUser, reserveUser, logoutUser, scheduleAppointment, getListOfWork, deleteWork, completeWork, ugetCompletedWork, ugetPendingWork };