const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "admin" }
});

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
