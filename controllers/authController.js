const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  let { email, password, fullname } = req.body;

  if (!email || !password || !fullname) {
    return res.status(400).send("All fields are required");
  }

  let user = await userModel.findOne({ email: email });
  if (user) return res.status(401).send("You already have an account, please login");

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send(err.message);

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.status(500).send(err.message);

      userModel
        .create({ email, password: hash, fullname })
        .then((user) => {
          let token = generateToken(user);
          res.cookie("token", token);
          return res.redirect("/shop");
        })
        .catch(() => res.status(500).send("Internal Server Error"));
    });
  });
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) return res.status(401).send("Email or Password incorrect");

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");

    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      return res.redirect("/shop"); // Redirects instead of rendering directly
    }

    return res.status(401).send("Email or Password incorrect");
  });
};

module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  return res.redirect("/");
};
