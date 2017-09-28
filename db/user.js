const db = require('./config.js')
const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	username: String,
  aPoemRead: Array,
  bookmarked: Array


})

module.exports = mongoose.model('Users', userSchema);