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
            console.log('This is scrapperdata articular line 53  ' + JSON.stringify(data));
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
    console.log(req.body);
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            Article.create(req.body, function (err, article) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(article);
                    user.articles.push(article);
                    user.save();
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
    User.findById(req.user._id).populate('articles'
    //     {
    //     path: 'articles',
    //     options: {
    //         sort: {
    //             'gpa': -1
    //         }
    //     }
    // }
).exec(function (err, user) {
        console.log(user.articles);
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
//Route to show Article details form 
//==============================================
router.get('/schools/:school_id/under_roll/:list_id/Articles/:id', function (req, res) {
    Article.findById(req.params.id).populate('comments').exec(function (err, Article) {
        // console.log("\n\n"+Article.comments);
        if (err) {
            console.log(err);
        } else {
            res.render("Articles/Article_detail", {
                comments: Article.comments,
                Article: Article,
                school_id: req.params.school_id,
                list_id: req.params.list_id
            });
        }
    });
});


//==============================================
//Route to show an school editable details form 
//==============================================
router.get('/Article/:id/edit', function (req, res) {
    School.findById(req.params.id, function (err, school) {
        if (err) {
            console.log(err);
        } else {
            res.render("schools/edit", {
                school: school
            });
        }
    });
});


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

//==============================================
//Route to delete an school
//==============================================
// router.delete('/schools/:id', function (req, res) {
//     School.findByIdAndRemove(req.params.id, function (err, school) {
//         if (err) {
//             console.log(err);
//         } else {
//             // req.flash("success", "School successfully updated");
//             res.redirect("/schools/");
//         }
//     });
// });



module.exports = router;