var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');
var Notes = require('../models/Note');
var webScrapper = require('../scraper/scraper');
var middleware = require('../middleware/index');


//==============================================
//Route to scrap web page
//==============================================
router.get('/scrape_articles', function (req, res) {
    webScrapper(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            // console.log('This is scrapperdata articular line 53  ' + JSON.stringify(data));
            res.render("home", {
                data: data,
                currentUser:req.user
            });
        }
    });
});


//==============================================
//Route to add/save news article to user
//==============================================
router.post('/scrape_articles', middleware.isLoggedIn, function (req, res) {
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            Article.create(req.body, function (err, article) {
                if (err) {
                    console.log(err);
                } else {
                    user.articles.push(article);
                    user.save();
                    res.end();
                    // req.flash("success", "HonorList successfully added.");
                }
            });
        }
    });
});


// ==============================================
// Route to show all user articles
// ==============================================
router.get("/articles/saved", middleware.isLoggedIn, function (req, res) {
    User.findById(req.user._id).populate('articles').exec(function (err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user.articles);
            res.render("articles", {
                articles: user.articles
            });
        }
    });

});


//==============================================
//Route to find and send one article
//==============================================
router.get("/articles/:id", function (req, res) {
    Article.findById(req.params.id).populate('notes').exec(function (err, foundArticle) {
        if (err) {
            console.log(err);
        } else {
            res.render('notes',{
                article:foundArticle,
                notes:foundArticle.notes
            });
        }
    });
});

// ==============================================
// Route to delete an article
// ==============================================
router.delete('/articles/delete/:id', function (req, res) {
    console.log(req.params.id);
    Article.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            // req.flash("success", "School successfully updated");
            res.redirect('/articles/saved');
        }
    });
});


module.exports = router;