const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,  // Fixed `number` -> `Number`
        required: true
    },
    discount: {
        type: Number,  // Fixed `number` -> `Number`
        default: 0
    },
    bgcolor: {
        type: String,
        required: true
    },
    panelcolor: {
        type: String,
        required: true
    },
    textcolor: {
        type: String,
        required: true
    }
}, { timestamps: true });  // Added timestamps

module.exports = mongoose.model("Product", productSchema);
