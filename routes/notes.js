var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');
var Note = require('../models/Note');


//=================================================================
//New notes route
//=================================================================
router.post('/articles/:id', function (req, res) {
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
//note destroy route
//=================================================================
router.delete("/articles/:article_id/note/:id", function(req, res){
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