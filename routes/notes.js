const express = require("express");
const router = express.Router();
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must be logged in.");
    res.redirect("/login");
}
router.get("/", isLoggedIn, (req, res) => {
    // console.log(req.user);
    res.render("notes/notes.ejs",{title : "Notes - Edushine Classes"});
});

module.exports = router;