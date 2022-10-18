const asyncHandler = require("express-async-handler")
const User = require("../Model/userModel")
const generateToken = require("../Utility/JWT-imp");

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, username, email, password, confirmPassword } = req.body;

    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({email});
  
    if (usernameExists) {
      error="Username has already been taken"
      res.status(404).send(error);
      throw new Error(error);
    }else if(emailExists){
      error="An account already exists under this email"
      res.status(404).send(error);
      throw new Error(error);
    }
    else if(password.length < 6){
      error="Password should be of minimum 6 characters"
      res.status(404).send(error)
      throw new Error(error)
    }
    else if(password !== confirmPassword){
      error="Passwords do not match"
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
    res.status(200).json({msg: 'you are authorized'})
  })
  
  const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
  })

module.exports = {registerUser, authUser, reserveUser, logoutUser};