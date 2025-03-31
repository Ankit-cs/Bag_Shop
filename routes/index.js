const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const ProductModel = require("../models/product.models");
const userModel = require("../models/user.models");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedin, async (req, res) => {
  try {
    let products = await ProductModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/cart", isLoggedin, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

    const bill= Number(user.cart[0].price)+20-Number(user.cart[0].discount);
  res.render("cart",{user,bill});
});

router.get("/addtocart/:productid", isLoggedin, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

router.get("/logout", isLoggedin, (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  return res.redirect("/");
});

module.exports = router;
