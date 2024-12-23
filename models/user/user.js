const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    //username password ye dono passport mongoose khud kar dega.
});
User.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",User);