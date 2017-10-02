const express = require ("express");
const parser = require('body-parser');
const path = require('path')
const db = require('./db/config')
const axios = require('axios')
const Poem = require('./db/poem')
const Users = require('./db/user')
const api = require('./api')
var session = require('express-session');
const passport = require('passport'), 
FacebookStrategy = require('passport-facebook').Strategy;


const app = express();

app.use(parser.json());
app.use(parser.urlencoded( { extended: false } ));
app.use(express.static(path.join(__dirname, 'public')));





app.use(require('express-session')({
  secret: 'travel'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: 503497313317767,
    clientSecret: '3d91139ff4bb64f4e821a75b5a50f7f2',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
   	done(null, profile);
  }
));

passport.serializeUser(function(profile, done) {
  done(null, profile);
});

passport.deserializeUser(function(profile, done) {
  done(null, profile);
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
    var sessData = req.session.passport;
    console.log(sessData);
    Users.findOne( {userId: sessData.user.id}, function(err, user) {
    	if (err) console.error(err)
    	if(!user) {
    		var newUser = new Users({
    				username: sessData.user.displayName,
						userId: sessData.user.id,
					  aPoemRead: [],
					  bookmarked: [],
					  description: ''
    		})
    		newUser.save(function(err) {
    			if (err) console.error(err);
    		})
    	}
    } )
  	res.redirect('/#/profile')
  });

// app.get('/discover', (req, res) => {
// 	console.log('testing');
// 	res.render('/discover');
// })


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

app.use('/api', api);

const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(`app listening on port ${port}`);
});