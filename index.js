const express = require("express");
const app = express();
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const notesRouter = require("./routes/notes.js");
const videosRouter = require("./routes/videos.js");
const userRouter = require("./routes/user.js");
const mongoose = require("mongoose");
const ejsMate = require('ejs-mate');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user/user.js")
require('dotenv').config();
const { title } = require("process");
const port = 8000;

const dbUrl = process.env.ATLASDB_URL;
main().then(()=>{
    console.log("Connection Successfull!");
})
.catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}
app.use(express.static("public/css"));
app.use(express.static("public/js"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.engine('ejs', ejsMate);

app.use(cookieParser("secretcode"));

app.listen(port,(req,res)=>{
    console.log(`app is listening on port ${port}`);
});

app.use(session({
    secret :process.env.SECRET,
    resave: false,
  saveUninitialized: true,
  cookie:{
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : Date.now() + 7 * 24 * 60 * 60 * 1000,
    httpOnly :true
  },
  store :MongoStore.create({
    mongoUrl : dbUrl,
    crypto :{
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
  })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.errorMsg = req.flash("error"); 
    res.locals.successMsg = req.flash("success");
    res.locals.currUser = req.user;
    next();
  });

app.get("/",wrapAsync(async(req,res)=>{
    res.render("homepage/index.ejs",{title : "Welcome To Edusine Classes - RRSIMT"});
}));
//Router for all notes

app.use("/",userRouter);
app.use("/notes",notesRouter);
app.use("/videos",videosRouter);


//Router for Contact us page
app.get("/contact",(req,res)=>{
    res.render("contact/contact.ejs",{title :"Contact | Edushine Classes"});
});
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"The page you are looking for was not found."));
});
//Error Handling Middleware
app.use((err,req,res,next)=>{
    let {statusCode= 500,message="Something Went Wrong!"} = err;
    res.status(statusCode).render("error/error.ejs",{message,statusCode,title :"Error Occured!"});
});