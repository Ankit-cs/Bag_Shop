const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: {
        type: Buffer
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: {
        type: String
    },
    panelcolor: {
        type: String
    },
    textcolor: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
