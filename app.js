const express=require("express");
const app=express();
const PORT=3000
const cookieParser=require("cookie-parser");
const path=require("path")
const ownersRouter=require("./routes/ownersRouters");
const productsRouter=require("./routes/productsRouters");
const usersRouter=require("./routes/usersRouters");
const db=require("./config/mongoose.connection")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");


app.use("/owners",ownersRouter)
app.use("/products",productsRouter)
app.use("/users",usersRouter)


app.listen(PORT,()=>{
    console.log(`Server is connected successfully at the port ${PORT}`)
})