const db = require('./config.js')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

var aPoemSchema = mongoose.Schema({
	title: String,
  author: String,
  lines: Array,
  comments: Array

})

aPoemSchema.plugin(autoIncrement.plugin, {
    model: 'APoem',
    field: 'poemId',
    startAt: 0,
    incrementBy: 1
});
module.exports = mongoose.model('APoem', aPoemSchema);