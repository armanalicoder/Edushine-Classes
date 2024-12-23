const mongoose = require("mongoose");
const cgData = require("./cgData.js");
const csData = require("./csData.js");
const dbmsData = require("./dbmsData.js");
const oopsData = require("./oopsData.js");
const osData = require("./osData.js");
const pythonData = require("./pythonData.js");
const uhvData = require("./uhvData.js");

const cgModel = require("../models/cgModel.js");
const csModel = require("../models/csModel.js");
const dbmsModel = require("../models/dbmsModel.js");
const oopsModel = require("../models/oopsModel.js");
const osModel = require("../models/osModel.js");
const pythonModel = require("../models/pythonModel.js");
const uhvModel = require("../models/uhvModel.js");

main().then(()=>{
    console.log("Connection Successfull!");
})
.catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb+srv://arman0786:TSWh34Y3pKXjBG2U@cluster0.tl999.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}


const initData = async()=>{
    //First Delete All the data from database
    // await cgModel.deleteMany({});
    // await csModel.deleteMany({});
    // await oopsModel.deleteMany({});
    // await dbmsModel.deleteMany({});
    // await osModel.deleteMany({});

    //Initiate the data into the database
    // await cgModel.insertMany(cgData);
    // await csModel.insertMany(csData);
    // await dbmsModel.insertMany(dbmsData);
    // await oopsModel.insertMany(oopsData);
    // await osModel.insertMany(osData);
    // await pythonModel.insertMany(pythonData);
    // await uhvModel.insertMany(uhvData);

}
initData();