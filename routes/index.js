const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const Product = require("../models/product.models");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedin, async (req, res) => {
  try {
    const products = await Product.find();
    res.render("shop", { products });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/logout", isLoggedin, (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  return res.redirect("/");
});

module.exports = router;
