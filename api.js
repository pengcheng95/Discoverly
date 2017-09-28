const Poem = require('./db/poem')
const express = require('express');
const router = express.Router();

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



module.exports = router;