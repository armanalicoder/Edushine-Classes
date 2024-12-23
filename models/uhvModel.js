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
const uhv = mongoose.model("uhv",videosSchema);

module.exports = uhv;