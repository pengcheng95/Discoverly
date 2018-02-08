const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')

const db = mongoose.connection;

db.on('error', () => console.error('EARroar!'));
db.once('open', function() {
  console.log('The doors are open! The doors are open.')
})

mongoose.connect(`mongodb://max:password@${process.env.password}.mlab.com:39989/findnew`);

autoIncrement.initialize(db);

module.exports = db