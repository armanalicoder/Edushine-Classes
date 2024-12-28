const express = require("express");
const router = express.Router();
const flash = require("connect-flash");
const Admin = require("../models/admin/adminModel.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.use(flash());

//route for admin GET Login page
router.get("/admin-login",wrapAsync(async(req,res)=>{
    if(req.user){
        req.flash("error","you are not authorized to access this page.")
       return res.redirect("/");
    }
    if(req.session.admin==undefined){
       return res.render("admin/adminhome.ejs",{title : "Admin Login | Edushine Classes"});
    }
    if(req.session.admin.role==="admin"){
        req.flash("success","You're already logged in as admin.");
        return res.redirect("/");
    }
}));

//route for admin POST login page
router.post("/admin-login", passport.authenticate('admin-local', {
    failureRedirect: "/admin-login",
    failureFlash: true,
}), async (req, res) => {
    if(req.user.role==="admin"){
        req.session.admin = req.user;
        req.flash("success", "You are logged in as admin.");
        return res.redirect("/admin-dashboard");
    }
});

//route for admin dashboard
router.get("/admin-dashboard", wrapAsync(async(req, res) => {
    const currAdmin= req.session.admin;
    if(currAdmin==undefined){
        req.flash("error","you are not authorized to access this page.");
        return res.redirect("/");
    }
    if(currAdmin.role=="admin"){
        return res.render("admin/dashboard.ejs", { title: "Welcome to Admin Dashboard" });
    }
    req.flash("error","you are not auuthorized to access this page.")
    return res.redirect("/")
}));

//route for admin logout
router.get("/admin-logout",wrapAsync(async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("error","Admin Log out Successfully!");
        return res.redirect("/");
    })
}));

module.exports = router;