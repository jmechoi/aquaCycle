var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sessionsController = require('./controllers/sessions.js');
var usersController = require('./controllers/users.js');

var app = express();

app.use(express.static('public'));

var mongoURI = process.env.MONGODB_URI || "mongodb://localhost/aquacycle"
mongoose.connect(mongoURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true}));

app.use(logger('dev'));

app.use(session({
	secret: "derpderpderpcats",
	resave: true,
	maxAge: 60 * 60 * 10000,
	saveUninitialized: false
}));

app.use('/users', usersController);
app.use('/sessions', sessionsController);

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Connected");
});
