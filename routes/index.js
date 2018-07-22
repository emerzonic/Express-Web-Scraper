var express = require('express');
var passport = require('passport');

var router = express.Router();
var User = require('../models/User');
var Articles = require('../models/Article');
var Notes = require('../models/Note');


//==============================================
//Catch all routes and redirect to home page
//==============================================
router.get('/', function (req, res) {
    res.redirect('/home');
});


//==============================================
// routes  to home page
//==============================================
router.get('/home', function (req, res) {
    res.render('home');
});

//==============================================
//Route to home page
//==============================================
router.get('/signup', function (req, res) {
    res.render('register');
});


//==============================================
//Route to home page
//==============================================
router.get('/signin', function (req, res) {
    res.render('signin');
});

//=======================
//Auth ROUTES
//=======================
//handling user sign up
router.post("/signup", function (req, res) {
    var newUser = new User({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        username: req.body.username
    });

    User.register(newUser, req.body.password, function (err, user) {
        console.log(user);
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/signup");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/home");
            });
        }
    });
});


//==============================================
//Route to login user
//==============================================
router.post("/signin", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/signin",
    failureFlash: true
}), function(req, res) {});

//==============================================
//Logout route
//==============================================
router.get("/logout", function (req, res) {
    req.logout();
    // req.flash("success", "You are logged out!");
    res.redirect("/signin");
});


module.exports = router;