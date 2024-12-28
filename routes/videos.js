const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Playlist = require("../models/admin/upload/playlistModel.js");
const CG = require("../models/cgModel.js");
const OS = require("../models/osModel.js");
const DBMS = require("../models/dbmsModel.js");
const OOPS = require("../models/oopsModel.js");
const CS = require("../models/csModel.js");
const python = require("../models/pythonModel.js");
const uhv = require("../models/uhvModel.js");

//Route for showing all videos 
router.get("/",async(req,res)=>{
    let data = await Playlist.find();
    // console.log(data[0].playlistImage.url);
    res.render("playlist/playlist.ejs",{title : "Videos | Edushine Classes",data});
});


//Route for Computer graphics page
router.get("/computer-graphics/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    const data = await CG.find({unit : id});
    const allData = await CG.find();
    // console.log(data);
    if(data[0]==null){
        next(new ExpressError(404,"This Page Couldn't Found!"));
    }
    else{
    const videoLink = data[0].url;
    const unitName = data[0].unitName;
    // console.log(videoLink);
    res.render("videos/cgnotes.ejs",{videoLink,unitName,allData,title:`${data[0].playlistName} - Edushine Classes`});
    }
}));

//Route for DBMS Page
router.get("/Database-Management-System/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    const data = await DBMS.find({unit : id});
    const allData = await DBMS.find();
    // console.log(data);
    if(data[0]==null){
        next(new ExpressError(404,"This Page Couldn't Found!"));
    }
    else{
    const videoLink = data[0].url;
    // console.log(videoLink);
    res.render("videos/dbms.ejs",{videoLink,allData,title:`${data[0].playlistName} - Edushine Classes`});
    }
}));

//Route for Cyber Security page
router.get("/cyber-security/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    const data = await CS.find({unit : id});
    const allData = await CS.find();
    // console.log(data);
    if(data[0]==null){
        next(new ExpressError(404,"This Page Couldn't Found!"));
    }
    else{
    const videoLink = data[0].url;
    let title = data[0].title;
    // console.log(videoLink);
    res.render("videos/cs.ejs",{videoLink,allData,title:`${data[0].playlistName} - Edushine Classes`});
    }
}));

//Router for OOPS with java Videos
router.get("/oops-with-java/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    const data = await OOPS.find({unit : id});
    const allData = await OOPS.find();
    // console.log(data);
    if(data[0]==null){
        next(new ExpressError(404,"This Page Couldn't Found!"));
    }
    else{
    const videoLink = data[0].url;
    let title = data[0].title;
    // console.log(videoLink);
    res.render("videos/oops.ejs",{videoLink,allData,title:`${data[0].playlistName} - Edushine Classes`});
    }
}));

//Router for operating System Videos
router.get("/operating-system/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    const data = await OS.find({unit : id});
    const allData = await OS.find();
    // console.log(data);
    if(data[0]==null){
        next(new ExpressError(404,"This Page Couldn't Found!"));
    }
    else{
    const videoLink = data[0].url;
    let title = data[0].title;
    // console.log(videoLink);
    res.render("videos/os.ejs",{videoLink,allData,title:`${data[0].playlistName} - Edushine Classes`});
    }
}));

//Route for Python Programming Videos 
router.get("/python-programming/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    const data = await python.find({unit : id});
    const allData = await python.find();
    // console.log(data);
    if(data[0]==null){
        next(new ExpressError(404,"This Page Couldn't Found!"));
    }
    else{
    const videoLink = data[0].url;
    let title = data[0].title;
    // console.log(videoLink);
    res.render("videos/python.ejs",{videoLink,allData,title:`${data[0].playlistName} - Edushine Classes`});
    }
}));

//Route for UHV Videos 
router.get("/universal-human-value/:id",wrapAsync(async(req,res,next)=>{
    let {id} = req.params;
    const data = await uhv.find({unit : id});
    const allData = await uhv.find();
    // console.log(data);
    if(data[0]==null){
        next(new ExpressError(404,"This Page Couldn't Found!"));
    }
    else{
    const videoLink = data[0].url;
    let title = data[0].title;
    // console.log(videoLink);
    res.render("videos/uhv.ejs",{videoLink,allData,title:`${data[0].playlistName} - Edushine Classes`});
}
}));
module.exports = router;