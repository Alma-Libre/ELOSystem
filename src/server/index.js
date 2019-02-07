const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passwordHash = require('password-hash');
const Strategy = require('passport-local').Strategy;

const dburl = require('./dbURL')
const User = require("./users");

const app = express();

mongoose.connect(dburl.dbroute, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("connected!");
});

passport.use(new Strategy(
	function (username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			if (user) {
				if (passwordHash.verify(password, user.password))
					done(null, user);
				else
					done(null, false, { message: "Incorrect Password" });
			} else {
				done(null, false, { message: "No such user" });
			}
		});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findOne({ _id: id }, (err, user) => {
		if (user) done(null, user);
		else done(null, false);
	});
});

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dist'));

function ensureLoggedin() {
	return function (req, res, next) {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			return res.send(401);
		}
		next();
	}
}

app.get('/api/getusers', (req, res) => {
	User.find((err, data) => {
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
		res.json({ 'loggedin': true });
	}
);

app.get('/api/logout', function(req, res){
	req.logout();
	res.redirect('/');
	});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
