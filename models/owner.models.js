const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
     
    },
    email: {
      type: String,
     
      unique: true,
    },
    password: {
      type: String,
     
    },
    products: {
      type: Array,
     
      default: [],
    },
    picture: {
      type: String,
      default: null,
    },
    gstin: {
      type: String,
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("owner", ownerSchema);
