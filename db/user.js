const db = require('./config.js')
const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	username: String,
	userId: String,
	description: String,
  aPoemRead: Array,
  bookmarked: Array,
  writtenPoem: Array,


})

module.exports = mongoose.model('Users', userSchema);