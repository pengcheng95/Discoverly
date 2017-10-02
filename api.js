const Poem = require('./db/poem')
const express = require('express');
const router = express.Router();
const Users = require('./db/user');
const UPoem = require('./db/userPoem')

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

router.post('/poem', function(req, res) {
	console.log(req.body);
	Poem.findOne( { 'poemId' : req.body.poemId }, function(err, poem) {
		if (err) console.error(err)
		res.send(poem);
	} )
})

router.post('/newComment', function(req, res) {
	console.log(req.body);
	var sessData = req.session.passport;
	console.log(sessData);
	Poem.findOne( {poemId: req.body.poemId}, function(err, poem) {
		var comments = poem.comments;
		var newComment = {
			comment: req.body.newComment,
			username: sessData.user.displayName,
			userId: sessData.user.id

		}
		comments.push(newComment);
		poem.comments = comments;
		poem.save(function(err) {
			if (err) console.error(err)
			res.send('good');
		})
	} )
})

router.post('/newUserPoem', function(req, res) {
	var sessData = req.session.passport;
	var newUserPoem = new UPoem ({
		title: req.body.title,
		author: sessData.user.displayName,
		lines: req.body.lines,
		comments: [],
		authorId: sessData.user.id
	})
	newUserPoem.save(function(err) {
		if (err) console.error(err)
	})
	Users.findOne( {userId: sessData.user.id}, function(err, user) {
		var newPoem = {
			title: req.body.title,
			author: sessData.user.displayName,
			authorId: sessData.user.id
		}
		var newUPoemList = user.writtenPoem;
		newUPoemList.push(newPoem);
		user.writtenPoem = newUPoemList;
		user.save(function(err) {
			if (err) console.log(err)
			res.send('f');
		})

	})
})

router.get('/checkSignin', function(req, res) {
	console.log('checking sign in');
	if (req.session.passport) {
		res.send('y');
	}
	else {
		res.send('n');
	}
})

router.post('/updateDescription', function(req, res) {
	console.log(req.body);
	var sessData = req.session.passport;
	Users.findOne( {userId: sessData.user.id}, function(err, user) {
		user.description = req.body.description;
		user.save(function (err, updatedUser) {
			if (err) console.error(err);
			res.send(updatedUser);
		})
	})
})



module.exports = router;