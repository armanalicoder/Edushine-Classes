const express = require("express");
const router = express.Router();
const flash = require("connect-flash");
const Admin = require("../models/admin/adminModel.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const Playlist = require("../models/admin/upload/playlistModel.js");
const DS = require("../models/dsModel.js");
const CG = require("../models/cgModel.js");
const OS = require("../models/osModel.js");
const DBMS = require("../models/dbmsModel.js");
const OOPS = require("../models/oopsModel.js");
const CS = require("../models/csModel.js");
const python = require("../models/pythonModel.js");
const uhv = require("../models/uhvModel.js");
const upload = multer({ storage});

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
        return res.redirect("/admin-dashboard");
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
        return res.render("admin/dashboard.ejs", { title: "Welcome to Admin Dashboard" , currAdmin});
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

//route for admin UPLOAD Videos
router.get("/admin-dashboard/upload-videos",(req,res)=>{
    const currAdmin= req.session.admin;
    if(req.user){
        req.flash("error","you are not authorized to access this page.")
       return res.redirect("/");
    }
    if(req.session.admin==undefined){
        req.flash("error","you are not authorized to access this page.")
       return res.redirect("/");
    }
    if(req.session.admin.role==="admin"){
        req.flash("success","You're already logged in as admin.");
        return res.render("admin/upload/videos.ejs",{title : "Upload Videos | Edushine Classes",currAdmin});
    }
    
})

async function uploadVideo(subject,playlistName,videoTitle,videoURL,videoUnit){
    if(subject==="DS"){
        let dsVideo = new DS({
            playlistName : playlistName,
            unitName : videoTitle,
            url : videoURL,
            unit : videoUnit
        })
        await dsVideo.save();
        return true;
    }
    else if(subject==="DBMS"){
        let dbmsVideo = new DBMS({
            playlistName : playlistName,
            unitName : videoTitle,
            url : videoURL,
            unit : videoUnit
        })
        await dbmsVideo.save();
        return true;
    }
    else if(subject==="CG"){
        let cgVideo = new CG({
            playlistName : playlistName,
            unitName : videoTitle,
            url : videoURL,
            unit : videoUnit
        })
        await cgVideo.save();
        return true;
    }
    else if(subject==="CS"){
        let csVideo = new CS({
            playlistName : playlistName,
            unitName : videoTitle,
            url : videoURL,
            unit : videoUnit
        })
        await csVideo.save();
        return true;
    }
    else  if(subject==="OOPS"){
        let oopsVideo = new OOPS({
            playlistName : playlistName,
            unitName : videoTitle,
            url : videoURL,
            unit : videoUnit
        })
        await oopsVideo.save();
        return true;
    }
    else if(subject==="OS"){
        let osVideo = new OS({
            playlistName : playlistName,
            unitName : videoTitle,
            url : videoURL,
            unit : videoUnit
        })
        await osVideo.save();
        return true;
    }
    else if(subject==="python"){
        let pythonVideo = new python({
            playlistName : playlistName,
            unitName : videoTitle,
            url : videoURL,
            unit : videoUnit
        })
        await pythonVideo.save();
        return true;
    }
    else if(subject==="uhv"){
        let uhvVideo = new uhv({
            playlistName : playlistName,
            unitName : videoTitle,
            url : videoURL,
            unit : videoUnit
        })
        await uhvVideo.save();
        return true;
    }
    else if(subject==""){
        return false;
    }
}

router.post("/admin-dashboard/upload-videos",wrapAsync(async(req,res)=>{
    let {subject,playlistName,videoTitle,videoURL,videoUnit} = req.body;
    let isUploaded = uploadVideo(subject,playlistName,videoTitle,videoURL,videoUnit);
    if(isUploaded){
        req.flash("success","Done Video has been Uploaded.")
        res.redirect("/admin-dashboard");
    }
    else{
        req.flash("error","Kindly Choose Subject.")
        res.redirect("/admin-dashboard")
    }
}));

//route for Admin upload Playlist
router.get("/admin-dashboard/upload-playlist",(req,res)=>{
    const currAdmin= req.session.admin;
    if(req.user){
        req.flash("error","you are not authorized to access this page.")
       return res.redirect("/");
    }
    if(req.session.admin==undefined){
        req.flash("error","you are not authorized to access this page.")
       return res.redirect("/");
    }
    if(req.session.admin.role==="admin"){
        req.flash("success","You're already logged in as admin.");
        return res.render("admin/upload/playlist.ejs",{title : "Upload Playlist | Edushine Classes",currAdmin});
    }
    
})

router.post("/admin-dashboard/upload-playlist",upload.single('playlistImage'),wrapAsync(async(req,res)=>{
    let {playlistName,playlistDescription,playlistURL} = req.body;
    const path = req.file.path;
    const filename = req.file.filename;
    let uploadedPlaylist = new Playlist({
        playlistName : playlistName,
        playlistDescription : playlistDescription,
        playlistURL : playlistURL,
        playlistImage :{
            url : path,
            filename : filename
        }
    });
    await uploadedPlaylist.save();
    
    res.send("Playlist Saved Now Check")
}));

module.exports = router;