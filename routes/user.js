const express = require("express");
const router = express.Router();
const flash = require("connect-flash");
const User = require("../models/user/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

//Flash Messaged Middleware
router.use(flash());

//route for user GET signup page
router.get("/signup",(req,res)=>{
    if(req.isAuthenticated()){
        req.flash("success","You're already Logged in.");
        res.redirect("/");
    }
    res.render("user/signup.ejs",{title:"Signup | Edushine Classes"});
});

//route for user POST signup page
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
}));

//route for user GET login page
router.get("/login",(req,res)=>{
    if(req.isAuthenticated()){
        req.flash("success","You're already Logged in.")
        res.redirect("/");
    }
    res.render("user/login.ejs",{title : "Login | Edushine Classes"});
});

//route for user POST login page
router.post("/login",passport.authenticate("local",{
    failureRedirect : "/login",
    failureFlash : true,
}),
async (req,res)=>{
    req.flash("success",`Welcome back ${req.user.username}`);
    res.redirect("/notes");
});

//router fou user logout
router.get("/logout",(req,res,next)=>{
    console.log(req.user);
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("error","Log out Successfully!");
        res.redirect("/");
    })
})

module.exports = router;