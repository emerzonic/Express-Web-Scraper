var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');
var Notes = require('../models/Note');
var webScrapper = require('../scraper/scraper');


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
                data: data
            });
        }
    });
});


//==============================================
//Route to add/save news article to user
//==============================================
router.post('/scrape_articles', function (req, res) {
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            Article.create(req.body, function (err, article) {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(article);
                    user.articles.push(article);
                    user.save();
                    res.end();
                    // req.flash("success", "HonorList successfully added.");
                    // res.redirect('/scrape_articles');
                }
            });
        }
    });
});


// ==============================================
// Route to show all user articles
// ==============================================
router.get("/articles/saved", function (req, res) {
    User.findById(req.user._id).populate('articles').exec(function (err, user) {
        // console.log(user.articles);
        if (err) {
            console.log(err);
        } else {
            res.render("articles", {
                articles: user.articles
            });
        }
    });

});




//==============================================
//Route to show Article notes form 
//==============================================
router.get("/articles/saved/:id", function (req, res) {
    Article.findById(req.params.id, function (err, foundArticle) {
        // console.log(req.params.id);
        if (err) {
            console.log(err);
        } else {
            res.json(foundArticle);
        }
    });
});


//==============================================
//Route to show an school editable details form 
//==============================================
// router.get('/Article/:id/edit', function (req, res) {
//     School.findById(req.params.id, function (err, school) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("schools/edit", {
//                 school: school
//             });
//         }
//     });
// });


//==============================================
//Route to edit schools
//==============================================
// router.put('/schools/:id', function (req, res) {
//     School.findByIdAndUpdate(req.params.id, req.body, function (err, school) {
//         if (err) {
//             console.log(err);
//         } else {
//             // req.flash("success", "School successfully updated");
//             res.redirect("/schools/" + req.params.id);
//         }
//     });
// });

// ==============================================
// Route to delete an article
// ==============================================
router.delete('/articles/delete/:id', function (req, res) {
    Article.findByIdAndRemove(req.params.id, function (err, article) {
        if (err) {
            console.log(err);
        } else {
            // req.flash("success", "School successfully updated");
            res.redirect('/articles/saved');
        }
    });
});



module.exports = router;