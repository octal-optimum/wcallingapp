

const User = require("../models/User");

const jwt = require("jsonwebtoken");


// function for generating new token

const generateToken = (user) => {
  return jwt.sign({ user }, "Helloiamsiva");
};



// registration function
const register =("",async (req, res) => {
    try {
     //if user is already exists
      let user = await User.findOne({ username: req.body.username });
      if (user) {
        return res.status(400).send({ message: "username Already Exists.." });
      }
 // if not then create new user
     user = await User.create(req.body);
   //generate the token
      const token = generateToken(user);
      return res.status(200).send({
        token: token,
        message: "User created successfully",
        user: user,
      });
    } catch (error) {
      console.log("error:", error);
      return res.status(500).send({ message: error.message });
    }
  });




// login function
 const login = async (req, res) => {
  try {
    //finding user
    const user = await User.findOne({ username: req.body.username });
    
    //if user does not exists then
    if (!user) {
      return res
        .status(400)
        .send({ message: "Your username or Password is incorrect" });
    }

    //if user mail is exists then check for correct password
    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res
        .status(400)
        .send({ message: "Your username or Password is incorrect" });
    }

    //if it matches then return user with token value
    const token = generateToken(user);

    return res.status(200).send({
      token: token,
      message: "Login Successful",
      user: user,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { register, login, generateToken };