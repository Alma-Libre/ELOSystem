const express = require('express');
const mongoose = require('mongoose');
const os = require('os');
const dbURL = require('./dbURL')
const User = require("./users");

const app = express();
const fs = require('fs') 
  
 
mongoose.connect(dbroute,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected!");
});

app.use(express.static('dist'));

app.get('/api/getusers', (req, res) => {
	User.find((err, data)=>{
		res.json(data);
	});
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));