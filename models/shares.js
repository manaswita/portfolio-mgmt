var mongoose = require('mongoose');

var share = mongoose.Schema({
	
	shareCode : {
	   type:String,
	   index:true
	},
	shareName : {
	   type : String
	}
 });

 var Share = module.exports = mongoose.model('Share', share);