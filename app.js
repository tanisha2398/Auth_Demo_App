var express=require("express");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/auth_demo_app",{useNewUrlParser:true});



var app=express();
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/secret",(req,res)=>{
    res.render("secret");
});




const port=3002;
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})