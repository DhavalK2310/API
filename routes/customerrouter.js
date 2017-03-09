var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
var Customers = require('../models/customerschema');

var customerRouter = express.Router();
customerRouter.use(bodyParser.json());

customerRouter.route('/')
.get(function(req,res){
    Customers.find({},function(err,customer){
        if(err) throw err;
        res.json(customer);
        // 200, application/json
    });
})
.post(function(req,res){
    Customers.create(req.body/**/,function(err,customer){
        if (err) {
            res.json({ "status": "fail", "message": "Something went wrong please try again" });
            //$("#cust").append('<option value=" ' + id + '">' + name + '</option>');
        } else {
            res.json({ "status": "success", "message": "Customer added successfully" });
        }
       
    });
});

customerRouter.route('/remove')
.post(function(req,res){
    var id = req.body.id;
    Customers.remove({_id: id }, function (err, doc){
        if(err) res.json({"status": "fail", "message": "Something went wrong please try again"});
        res.json({ "status": "success", "message": "Customer Deleted Successfully" });
    });
});

customerRouter.route('/getbyid')
.post(function(req,res){
	 var id = req.body.id;
	 Customers.findById( id ,function (err, customer){
	     if (err) res.json({"status": "fail", "message": "Something went wrong please try again"});	
	     res.json({ "status": "success", "message": "get by id", "customer": customer });	
	 });
});
customerRouter.route('/edit')
.post(function(req,res){
    var id = req.body.id;
    var firstname = req.body.firstname;
	var mobileno = req.body.mobileno;
	var email = req.body.email;
	var address = req.body.address;

	Customers.findById( id , function (err, customer) {
	    if (err) {
	        res.json({"status": "fail", "message": "Something went wrong please try again"});
	    }
	    else {
			customer.firstname = firstname;
			customer.mobileno = mobileno;
			customer.email = email;
			customer.address = address;
			
	        customer.save(function (err, customer) {
	            if (err) {
	                res.json({"status": "fail", "message": "Customer Not Update Sucessfully"});
	            } else {
	                res.json({"status": "success", "message": "Customer successfully updated"});
	            }
	        });
	    }
	});		
});

module.exports = customerRouter;