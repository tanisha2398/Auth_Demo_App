var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var userSchema=new mongoose.Schema({
    name:String,
    password:String
});

 userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);
