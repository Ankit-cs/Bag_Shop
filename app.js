const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const ownersRouter = require("./routes/ownersRouters");
const productsRouter = require("./routes/productsRouters");
const usersRouter = require("./routes/usersRouters");
const indexRouter = require("./routes/index");
const db = require("./config/mongoose.connection");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is connected successfully at the port ${PORT}`);
});
