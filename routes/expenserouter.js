var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Expense = require('../models/expenseschema');

var expenseRouter = express.Router();
expenseRouter.use(bodyParser.json());

expenseRouter.route('/')
.get(function (req, res) {
    Expense.find({}, function (err, expense) {
        if (err) throw err;
        res.json(expense);
        // 200, application/json
    });
})


.post(function (req, res) {
    Expense.create(req.body/**/, function (err, expense) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "Expense  added successfully" });
    });
});

expenseRouter.route('/remove')
.post(function (req, res) {
    var id = req.body.id;
    Expense.remove({ _id: id }, function (err, doc) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "Expense Deleted Successfully" });
    });
});


expenseRouter.route('/getbyid')
.post(function (req, res) {
    var id = req.body.id;
    Expense.findById(id, function (err, expense) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "get by id", "Expense": expense });
    });
});
expenseRouter.route('/edit')
.post(function (req, res) {
    var id = req.body.id;
    var expdate = req.body.date;
    var amount = req.body.amount;
    var project = req.body.project;
    var extype = req.body.extype;
    var comment = req.body.comment;

    Expense.findById(id, function (err, expense) {
        if (err) {
            res.json({ "status": "fail", "message": "Something went wrong please try again" });
        }
        else {
            expense.date = expdate;
            expense.amount = amount;
            expense.project = project;
            expense.extype = extype;
            expense.comment = comment;

            expense.save(function (err, expense) {
                if (err) {
                    res.json({ "status": "fail", "message": "Expense Not Update Sucessfully" });
                } else {
                    res.json({ "status": "success", "message": "Expense successfully updated" });
                }
            });
        }
    });
});

module.exports = expenseRouter;