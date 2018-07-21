var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');
var Note = require('../models/Note');



//=================================================================
//New notes route
//=================================================================
router.post('/articles/:id/notes', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        if (err) {
            console.log(err);
        } else {
            Note.create(req.body, function (err, note) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(note);
                    article.notes.push(note);
                    article.save();
                    res.redirect("/articles/saved");
                    // req.flash("success", "HonorList successfully added.");
                    // res.redirect('/scrape_articles');
                }
            });
        }
    });
});

//==============================================================
//CREATE - Add new comments to DB
//==============================================================
router.post("/schools/:school_id/under_roll/:list_id/students/:student_id", function (req, res) {
    console.log(req.body);
    // find the student with provided ID
    Student.findById(req.params.student_id, function (err, student) {
        if (err) {
            // req.flash("error","Something went wrong.");
            res.redirect("/schools");
        } else {
            Comment.create(req.body, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.name = `${req.user.firstName} ${req.user.lastName}`;
                    //Save comment
                    comment.save();
                    student.comments.push(comment._id);
                    student.save();
                    Comment.find({}, function (err, comments) {
                        // req.flash("success","Comment successfully added.");
                        res.redirect(`/schools/${req.params.school_id}/under_roll/${req.params.list_id}/students/${req.params.student_id}`);
                    });
                }
            });
        }
    });
});

// //Comment edit route
// router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
//     Comment.findById(req.params.comment_id, function (err, foundComment) {
//         if (err) {
//             req.flash("error","Something went wrong.");
//             res.redirect("back");
//         } else {
//           res.render("comments/edit", {student_id: req.params.id, comment: foundComment}); 
//         }
//     });

// });

// //comment update route
// router.put("/:id", middleware.checkCommentOwnership, function(req, res) {
//     //senitize data
//     // req.body.student.body = req.sanitize(req.body.comment.body);
//     //find comment ID in DB
//     Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, updatedComment) {
//         if (err) {
//             req.flash("error","Something went wrong.");
//             res.redirect("back");
//         }
//         else {
//             req.flash("success","Comment successfully updated.");
//             res.redirect("/schools/" + req.params.id);
//         }
//     });
// });

// //comment destroy route
// router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     //find Comment ID in DB
//     Comment.findByIdAndRemove(req.params.comment_id, function(err) {
//         if (err) {
//             req.flash("error","Something went wrong.");
//             res.redirect("back");

//         }
//         else {
//             req.flash("success","Comment deleted.");
//             res.redirect("/schools/" + req.params.id);

//         }
//     });
// });




module.exports = router;