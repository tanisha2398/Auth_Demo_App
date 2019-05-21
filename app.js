var express                      =require("express"),
     mongoose                    =require("mongoose"),
     passport                    =require("passport"),
     LocalStrategy               =require("passport-local"),
     passportLocalMongoose       =require("passport-local-mongoose"),
     bodyparser                  =require("body-parser"),
     User                        =require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app",{useNewUrlParser:true});




var app=express();
app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret:"Tanisha is best",
    resave:false, 
    saveUninitialized:false
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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