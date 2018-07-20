var mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
         name: String
    } 
});

module.exports = mongoose.model("Note", noteSchema);
