var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Crud = require('../models/crudschema');

var crudRouter = express.Router();
crudRouter.use(bodyParser.json());

crudRouter.route('/')
.get(function (req, res) {
    Crud.find({}, function (err, crud) {
        if (err) throw err;
        res.json(crud);
        // 200, application/json
    });
})
.post(function (req, res) {
    Crud.create(req.body/**/, function (err, crud) {
        if (err) {
            res.json({ "status": "fail", "message": "Something went wrong please try again" });
            //$("#cust").append('<option value=" ' + id + '">' + name + '</option>');
        } else {
            res.json({ "status": "success", "message": "added successfully" });
        }

    });
});

module.exports = crudRouter;