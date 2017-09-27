const express = require ("express");
const parser = require('body-parser');
const path = require('path')


const app = express();

app.use(parser.json());
app.use(parser.urlencoded( { extended: false } ));
app.use(express.static(path.join(__dirname, 'public')));












const port = 3000;

app.listen(port, function() {
	console.log(`app listening on port ${port}`);
});