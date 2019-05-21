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
app.use(bodyparser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret:"Tanisha is best",
    resave:false, 
    saveUninitialized:false
}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===============
//ROUTE
//================


app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/secret",(req,res)=>{
    res.render("secret");
});
//AUTH ROUTEs

//show register form
app.get("/register",(req,res)=>{
    res.render("register");
});

//handle user sign-up
app.post("/register",(req,res)=>{
    req.body.username
    req.body.password
     User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
         if(err){
             console.log(err);
             return res.render("register");
         }else{
             passport.authenticate("local")(req,res,function(){
                 res.redirect("/secret");
             });
            }
     });

});

//LOGIN ROUTES
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req,res){
}); 



const port=3002;
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
});