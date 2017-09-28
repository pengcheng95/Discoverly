const express = require ("express");
const parser = require('body-parser');
const path = require('path')
const db = require('./db/config')
const axios = require('axios')
const Poem = require('./db/poem')
const Users = require('./db/user')
const api = require('./api')


const app = express();

app.use(parser.json());
app.use(parser.urlencoded( { extended: false } ));
app.use(express.static(path.join(__dirname, 'public')));


var allPoems = [];
for (var i = 0; i < 3118; i++) {
	allPoems.push(i);
}

app.use('/api', api);


// axios.get('http://poetrydb.org/author')
// 	.then((res) => {
// 		res.data.authors.forEach(author => {
// 			axios.get(`http://poetrydb.org/author/${author}`)
// 				.then((authorRes) => {
// 					authorRes.data.forEach((poem) => {
// 						var newPoem = new Poem({
// 							title: poem.title,
// 							author: poem.author,
// 							lines: poem.lines
// 						})
// 						newPoem.save(function(err) {
// 							if (err) console.log(err);
// 						})
// 					})

// 				})
// 		})
// 	})



app.get('/test', function(req, res) {
	res.send('new Title');
})

const port = 3000;

app.listen(port, function() {
	console.log(`app listening on port ${port}`);
});