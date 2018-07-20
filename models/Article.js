var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  'title': { type: String },
  'summary': { type: String },
  'url': { type: String },
  'writer': { type: String },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now },
  'notes': [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
  }
]
});



module.exports = mongoose.model('Article', articleSchema);
