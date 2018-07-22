//All middleware goes here
var middleware = {};

//middleware: Check if user is logged in
middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("info","Please login to perform that action.");
    res.redirect("/signin");
};


module.exports = middleware;