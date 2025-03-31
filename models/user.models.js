const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    cart: {
      type: Array,
      default: [],
    },
    contact: {
      type: String,  
      trim: true,
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"product",
    }],
    picture: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
