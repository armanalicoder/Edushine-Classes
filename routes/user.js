const express = require("express");
const router = express.Router();
const flash = require("connect-flash");
const User = require("../models/user/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");


router.use(flash());
router.get("/signup",(req,res)=>{
    if(req.isAuthenticated()){
        req.flash("success","You're already Logged in.");
        res.redirect("/");
    }
    res.render("user/signup.ejs",{title:"Signup | Edushine Classes"});
});
router.post("/signup",wrapAsync(async(req,res,next)=>{
    let {email,username,password} = req.body;
    const newUser = new User({email,username});
    const saveUser = await User.register(newUser,password);
    req.login(saveUser,(err)=>{
        if(err){
            next(err);
        }
        else{
            req.flash("success",`Registered Successfully! Welcome ${username}`);
            res.redirect("/notes");
        }
    })
    // res.send(saveUser);
}));
router.get("/login",(req,res)=>{
    if(req.isAuthenticated()){
        req.flash("success","You're already Logged in.")
        res.redirect("/");
    }
    res.render("user/login.ejs",{title : "Login | Edushine Classes"});
});
router.post("/login",passport.authenticate("local",{
    failureRedirect : "/login",
    failureFlash : true,
}),
async (req,res)=>{
    req.flash("success","You are Logged in.");
    res.redirect("/");
});

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("error","Log out Successfully!");
        res.redirect("/");
    })
})

module.exports = router;