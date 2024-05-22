const User = require("../models/userschema");
const bcrypt = require("bcrypt");

//profile
module.exports.profile = async (req, res) => {
 
};

//Render sign up page
module.exports.signup = (req, res) => {
  res.render("user_signup", { title: "sign up" });
};

// render signin page
module.exports.signin = (req, res) => {
  res.render("user_signin", { title: "sign in" });
};

//get sign up data
module.exports.create = async (req, res) => {
 
};

//create login session/ process sign in data
module.exports.createSession = async (req, res) => {
  
};

//signOut
module.exports.signOut = (req, res) => {

};