var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var ExpenseSchema = new Schema({
    date: {
        type: String,
        require: true
    },
    project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    head: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
}, {
    timestamps: true //Add two fields automatically createdAt and updatedAt
});
var Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;
