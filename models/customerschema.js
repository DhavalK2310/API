var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var CustomerSchema = new Schema({
	firstname:{
		type:String,
		require:true,
		unique:true
	},
	mobileno:{
		type:String,
		required:true,
		unique:true
	},
	email:{
		type:String,
		unique:true
	},
	address:{
	type:String
	},
},{timestamps:true //Add two fields automatically createdAt and updatedAt
});
var Customer =mongoose.model('Customer',CustomerSchema);
module.exports=Customer;