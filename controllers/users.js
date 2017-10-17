var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var auth = require('../helpers/auth.js');
var User = require('../models/user.js');

router.post('/', auth.createSecure, function(req,res){
	var user = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		birthdate: req.body.birthdate,
		address: req.body.address,
		address2: req.body.address2,
		city: req.body.city,
		state: req.body.state,
		zipcode: req.body.zipcode,
		password_digest: res.hashedPassword
	});
	user.save(function(err,user){
		if(err){
			res.json({status: 500, error:err});
		}
		res.json(user)
	});
});

module.exports = router;