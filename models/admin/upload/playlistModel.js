const mongoose = require("mongoose");


const playlistSchema = new mongoose.Schema({
    playlistName :{
        type :String,
    },
    playlistDescription : {
        type : String
    },
    playlistURL : {
        type : String
    },
    playlistImage :{
        url : String,
        filename : String,
    }
});
const Playlist = mongoose.model("Playlist",playlistSchema);

module.exports = Playlist;