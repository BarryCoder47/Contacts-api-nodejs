const asyncHandler = require ('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require ('bcrypt');

// register a new user
// route POST/api/users/register
// access public 
const registerUser =  asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    if(!username|| !email || !password){
        res.status(400)
        throw new Error("user not found");
    }
    const userAvaiabale = await User.findOne({email});
    if(userAvaiabale){
        res.status(400)
        throw new Error("User Already register");

    }
      //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hash Password: ", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user}`);
  if(user){
    res.status(201).json({_id: user.id, email: user.email});
  }else {
    res.status(400);
    throw new Error("User data not found");
  }
  res.json({message : "Request the user"})
});


const loginUser =  asyncHandler(async(req, res) => {
    res.json({message : "Login the user"});
});


const currentUser =  asyncHandler(async(req, res) => {
    res.json({message : "Show the current the user"});
});


module.exports = {
    registerUser, loginUser , currentUser
}