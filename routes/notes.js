var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');
var Note = require('../models/Note');


//=================================================================
//New notes route
//=================================================================
router.post('/articles/:id', function (req, res) {
    Article.findById(req.params.id).populate('notes').exec(err, article) {
        if (err) {
            console.log(err);
        } else {
            Note.create(req.body, function (err, note) {
                if (err) {
                    console.log(err);
                } else {
                    article.notes.push(note);
                    article.save();
                    res.render('notes',{
                        article:article,
                        notes:article.notes
                    });
                    // req.flash("success", "HonorList successfully added.");
                    // res.redirect('/scrape_articles');
                }
            });
        }
    });
});


//comment destroy route
router.delete("/:id", function(req, res){
    //find Comment ID in DB
    Note.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            // req.flash("error","Something went wrong.");
            res.redirect("back");
        }
        else {
            // req.flash("success","Comment deleted.");
            res.end();
        }
    });
});




module.exports = router;