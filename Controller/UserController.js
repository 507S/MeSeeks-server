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
    error = "Password should be of minimum 6 characters"
    res.status(404).send(error)
    throw new Error(error)
  }
  else if (password !== confirmPassword) {
    error = "Passwords do not match"
    res.status(404).send(error)
    throw new Error(error)
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

  const workListModel = await WorkList.create({
    uid,
    workerType,
    location,
    address,
    phone,
    list,
    status
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

module.exports = { registerUser, authUser, reserveUser, logoutUser, scheduleAppointment, getListOfWork, deleteWork };