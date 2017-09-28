const Poem = require('./db/poem')
const express = require('express');
const router = express.Router();
const Users = require('./db/user');

var allPoems = [];
for (var i = 0; i < 3118; i++) {
	allPoems.push(i);
}

router.get('/test', function(req, res) {
	res.send('test successful');

})

router.get('/random', function(req, res) {
	var num = Math.ceil(Math.random() * allPoems.length);
	Poem.findOne( { 'poemId' : num }, function(err, poem) {
		if (err) console.error(err)
		res.send(poem);
	} )	
})

router.get('/getUser', function(req, res) {
	var sessData = req.session.passport;
	Users.findOne( {userId: sessData.user.id}, function(err, user) {
		console.log('user', user);
		res.send(user);
	})
})

router.post('/addBookmark', function(req, res) {
	var sessData = req.session.passport;
	Users.findOne( {userId: sessData.user.id}, function(err, user) {
		console.log('user', user);
		var updatedBookmark = user.bookmarked;
		updatedBookmark.push(req.body);
		user.bookmarked = updatedBookmark;
		user.save(function (err, updatedUser) {
			if (err) console.error(err);
			res.send(updatedUser);
		})
	})
})



module.exports = router;