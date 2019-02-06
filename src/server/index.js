const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const dburl = require('./dbURL')
const User = require("./users");

const app = express();

mongoose.connect(dburl.dbroute,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("connected!");
});

passport.use(new Strategy(
	function (username, password, cb) {
		if (username == 'almalibre' && password == 'password')
			cb(null, { id: 1, username: "almalibre", password: 'password' });
		else
			cb(null, false);
	}
));

passport.serializeUser(function (user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
	if (id == 1) cb(null, { id: 1, username: "k", password: "p" });
	else cb(null, false);
});

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));

function ensureLoggedin () {
	return function (req, res, next) {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			return res.send(401);
		}
		next();
	}
}

app.get('/api/getusers', (req, res) => {
	User.find((err, data)=>{
		res.json(data);
	});
});

app.post('/api/login',
	passport.authenticate('local'),
	function (req, res) {
		res.json({ success: true });
	}
);

app.get('/api/amiloggedin',
	ensureLoggedin(),
	function (req, res) {
		res.json({'loggedin': true});
	}
);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
