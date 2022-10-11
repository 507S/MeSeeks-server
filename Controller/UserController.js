const asyncHandler = require("express-async-handler")
const User = require("../Model/userModel")
const generateToken = require("../Utility/JWT-imp");

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, username, email, password, confirmPassword, rememberMe } = req.body;

    const usernameExists = await User.findOne({ username });
    const emailExists = await User.findOne({email});
  
    if (usernameExists) {
      res.status(404);
      throw new Error("Username has already been taken");
    }else if(emailExists){
        res.status(404);
      throw new Error("An account already exists under this email");
    }
  
    const user = await User.create({
        firstname,
        lastname,
        username, 
        email, 
        password, 
        confirmPassword, 
        rememberMe
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
      res.status(401);
      throw new Error("Invalid Email or Password");
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