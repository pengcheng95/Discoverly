const db = require('./config.js')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

var uPoemSchema = mongoose.Schema({
	title: String,
  author: String,
  lines: Array,
  comments: Array,
  authorId: String

})

uPoemSchema.plugin(autoIncrement.plugin, {
    model: 'UPoem',
    field: 'poemId',
    startAt: 0,
    incrementBy: 1
});
module.exports = mongoose.model('UPoem', uPoemSchema);