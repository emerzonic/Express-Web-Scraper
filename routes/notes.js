var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var Note = require('../models/Note');
var middleware = require('../middleware/index');



//=================================================================
//Create new notes route
//=================================================================
router.post('/articles/:id', middleware.isLoggedIn, function (req, res) {
    Article.findById(req.params.id).populate('notes').exec( function (err, article) {
        if (err) {
            console.log(err);
        } else {
            Note.create(req.body, function (err, note) {
                if (err) {
                    console.log(err);
                } else {
                    article.notes.push(note);
                    article.save();
                    res.redirect('/articles/saved/'+ req.params.id);                    
                }
            });
        }
    });
});

//=================================================================
//Destroy notes route
//=================================================================
router.delete("/articles/:article_id/note/:id", middleware.isLoggedIn, function(req, res){
    Note.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect('/articles/saved/'+ req.params.article_id);
        }
        else {
            res.redirect('/articles/saved/'+ req.params.article_id);
        }
    });
});




module.exports = router;