require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose connection
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("Connected to the DB");
});

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);
// route prefix
app.use("",require('./routes/routes'));

app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
})

// ejs template engine
app.set('view engine','ejs');


// Routes
app.get("/", (req, res) => {
  res.send("hi");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
