const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  let { email, password, fullname } = req.body;

  if (!email || !password || !fullname) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let user = await userModel.findOne({ email: email });
  if (user) return res.status(401).json({ error: "You already have an account, please login" });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json({ error: err.message });

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.status(500).json({ error: err.message });

      userModel.create({ email, password: hash, fullname })
        .then((user) => {
          let token = generateToken(user);
          res.cookie("token", token);
          return res.status(201).json({ message: "User registered successfully", user, token });
        })
        .catch(() => res.status(500).json({ error: "Internal Server Error" }));
    });
  });
};
