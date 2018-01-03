var mongoose = require('mongoose');

var user = mongoose.Schema({
	
	username : {
	   type:String,
	   index:true
	},
	name : {
	   type : String
	},
	email : {
	   type: String
	},
	password : {
	   type:String
	}
 });

 var crypto = require('crypto');
 var User = module.exports = mongoose.model('User', user);
 
 var generateHash = function(password){
	var hash = 0;
	
    if (password.length == 0) return hash;
    for (i = 0; i < password.length; i++) {
        char = password.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
	}
    return hash;
 };

 module.exports.createUser = function(userObject,callback){
	var hash = generateHash(userObject.password);
	userObject.password  = hash;
	userObject.save(callback);
 }

module.exports.findByUsername = function(username, callback){
    User.findOne({username:username},callback);
}

module.exports.validatePassword = function(password, foundPasswordHash, callback){
	
	  var pwHash = generateHash(password);
	   if(pwHash==foundPasswordHash){
		 callback(null,true);
	  }else {
		  callback(null, false);
	  }
   }

module.exports.findById = function(id, callback){
	User.findById(id, function(err, user){
		if(err){
			return callback(err);
		}
		return callback(null, user);
	});
}
