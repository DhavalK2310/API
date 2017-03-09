var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Booking = require('../models/bookingschema');

var bookingRouter = express.Router();
bookingRouter.use(bodyParser.json());

bookingRouter.route('/')
.get(function (req, res) {
    Booking.find({}, function (err, booking) {
        if (err) throw err;
        res.json(booking);
        // 200, application/json
    });
})


.post(function (req, res) {
    Booking.create(req.body/**/, function (err, booking) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "Booking  added successfully" });
    });
});

//bookingRouter.route('/remove')
//.post(function (req, res) {
//    var id = req.body.id;
//    Expense.remove({ _id: id }, function (err, doc) {
//        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
//        res.json({ "status": "success", "message": "Expense Deleted Successfully" });
//    });
//});


//expenseRouter.route('/getbyid')
//.post(function (req, res) {
//    var id = req.body.id;
//    Expense.findById(id, function (err, expense) {
//        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
//        res.json({ "status": "success", "message": "get by id", "Expense": expense });
//    });
//});
//expenseRouter.route('/edit')
//.post(function (req, res) {
//    var id = req.body.id;
//    var expdate = req.body.date;
//    var amount = req.body.amount;
//    var project = req.body.project;
//    var extype = req.body.extype;
//    var comment = req.body.comment;

//    Expense.findById(id, function (err, expense) {
//        if (err) {
//            res.json({ "status": "fail", "message": "Something went wrong please try again" });
//        }
//        else {
//            expense.date = expdate;
//            expense.amount = amount;
//            expense.project = project;
//            expense.extype = extype;
//            expense.comment = comment;

//            expense.save(function (err, expense) {
//                if (err) {
//                    res.json({ "status": "fail", "message": "Expense Not Update Sucessfully" });
//                } else {
//                    res.json({ "status": "success", "message": "Expense successfully updated" });
//                }
//            });
//        }
//    });
//});

module.exports = bookingRouter;