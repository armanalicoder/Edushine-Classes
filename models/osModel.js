const mongoose = require("mongoose");


const videosSchema = new mongoose.Schema({
    playlistName :{
        type :String,
    },
    unitName : {
        type : String
    },
    unit : {
        type : String
    },
    url : {
        type : String,
    }
});
const OS = mongoose.model("OS",videosSchema);

module.exports = OS;