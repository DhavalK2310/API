var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var RegisterSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
	username:{
		type:String,
		require:true,
		unique:true
	},
	dispname:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	}
},{timestamps:true //Add two fields automatically createdAt and updatedAt
});
var Registers=mongoose.model('Register',RegisterSchema);
module.exports=Registers;