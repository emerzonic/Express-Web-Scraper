var express = require("express"),   
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mongoose = require('mongoose'),
passport = require('passport'),
LocalStrategy = require("passport-local"),
exphbs = require('express-handlebars'),
articles = require('./routes/articles'),
notes = require('./routes/notes'),
index = require('./routes/index'),
User = require('./models/User');



// var middleware = require('./middleware/index');
// var mailer = require('./mailer/email');
var app = express();
 

//SETUP APP TO USE PACKAGES
mongoose.connect("mongodb://localhost/web-scrapperDB");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

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
  next();
});

//SET UP APP TO USE CONTROLLERS/ROUTES
app.use(articles);
app.use(notes);
app.use(index);

// App PORT setting
var PORT = process.env.PORT || 8080;
// Application server.
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });