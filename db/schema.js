var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var UserSchema = new Schema({
	name: String,
	email: String,
	username: String,
	birthdate: Date,
	address: String,
	address2: String,
	city: String,
	state: String,
	zipcode: Number,
	password_digest: String
});

UserSchema.pre('save', function(next){
	now = new Date();
	this.updated_at = now;

	if (!this.created_at){
		this.created_at = now
	}
	next()
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = {
	User: UserModel
}