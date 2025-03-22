const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/scatch", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    contact: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
