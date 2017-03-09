var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
	name:{
		type:String,
		require:true,
		unique:true
	},
	address:{
		type:String,
		required:true
	},
	city:{
		type:String,
		required:true
	}
},{timestamps:true //Add two fields automatically createdAt and updatedAt
});
var Projects = mongoose.model('Project', ProjectSchema);
module.exports = Projects;