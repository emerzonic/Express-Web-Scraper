//middleware object
var middleware = {};

//middleware: Check if user is logged in
middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("info","Please login to access saved articles.");
    res.redirect("/signin");
};


module.exports = middleware;