const express = require("express");
const router = express.Router();
const CG = require("../models/cgModel.js");
const OS = require("../models/osModel.js");
const DBMS = require("../models/dbmsModel.js");
const OOPS = require("../models/oopsModel.js");
const CS = require("../models/csModel.js");
const python = require("../models/pythonModel.js");
const uhv = require("../models/uhvModel.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/search",wrapAsync(async(req,res)=>{
    let query= req.query;
    const allData = [];
    // const data = [];
    allData.push(await CG.findOne());
    allData.push(await OS.findOne());
    allData.push(await DBMS.findOne());
    allData.push(await OOPS.findOne());
    allData.push(await CS.findOne());
    allData.push(await python.findOne());
    allData.push(await uhv.findOne());
    const data = allData;
    // console.log(data);
    const userquery = query.query;
    res.render("search/search.ejs",{title : "Search Result | Edushine Classes",data,userquery});
}));
module.exports = router;