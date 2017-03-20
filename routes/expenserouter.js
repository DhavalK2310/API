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
    try {
        Expense.findById(id, function (err, expense) {
            if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
            res.json({ "status": "success", "message": "get by id", "Expense": expense });
        });
    }
    catch (err) {
        res.json({ "status": "fail", "message": "Something went wrong please try again", "Expense": "" });
    }
});
expenseRouter.route('/edit')
.post(function (req, res) {
    var id = req.body.id;
    var date = req.body.date;
    var project = req.body.project;
    var head = req.body.head;
    var comment = req.body.comment;
    var amount = req.body.amount;
    Expense.findById(id, function (err, expense) {
        if (err) {
            res.json({ "status": "fail", "message": "Something went wrong please try again" });
        }
        else {
            expense.date = date;
            expense.project = project;
            expense.head = head;
            expense.comment = comment;
            expense.amount = amount;

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
