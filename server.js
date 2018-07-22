var methodOverride = require('method-override'),
  LocalStrategy = require("passport-local"),
  bodyParser = require('body-parser'),
  articles = require('./routes/articles'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  express = require("express"),
  exphbs = require('express-handlebars'),
  flash = require('connect-flash-plus'),
  notes = require('./routes/notes'),
  index = require('./routes/index'),
  User = require('./models/User');

var app = express();

//SETUP APP TO USE PACKAGES
mongoose.connect("mongodb://localhost/web-scrapperDB");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

//Handlebars config
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "god is good",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Track the current user
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.info = req.flash("info");
  res.locals.error = req.flash("error");
  next();
});

//Set up app to use routes
app.use(articles);
app.use(notes);
app.use(index);

// App PORT setting
var PORT = process.env.PORT || 8080;
// Application server.
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});