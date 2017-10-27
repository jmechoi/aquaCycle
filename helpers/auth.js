var User = require('../models/user.js');
var bcrypt = require('bcrypt');

function createSecure(req,res,next){
	var password = req.body.password;
	res.hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	next();
}

function loginUser(req,res,next){
	var email = req.body.email;
	var password = req.body.password;

	User.findOne({email:email})
	.then(function(user){
		if(user == null) {
			res.json({status: 401, data:"User not found"})
		}
		else if (bcrypt.compareSync(password, user.password_digest)){
			console.log(user);
			req.session.currentUser = user;
		}
		next();
	})
	.catch(function(err){
		res.json({status: 500, data:err})
	});
}

function authorize(req,res,next){
	var user = req.session.currentUser;

	if (user || user._id !== req.params.id){
		res.send({status: 402, data: "unauthorized access"})
	} else {
		next();
	}
}

module.exports = {
	createSecure: createSecure,
	loginUser: loginUser,
	authorize: authorize
}