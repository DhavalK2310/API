var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var CrudSchema = new Schema({
    firstname: {
        type: String,
        require: true
    },
    mobileno: {
        type: String,
        required: true
       
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
}, {
    timestamps: true //Add two fields automatically createdAt and updatedAt
});
var Crud = mongoose.model('Crud', CrudSchema);
module.exports = Crud;