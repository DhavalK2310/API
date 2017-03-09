var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
var Registers = require('../models/registerschema');

var registerRouter = express.Router();
registerRouter.use(bodyParser.json());

registerRouter.route('/')
.get(function(req,res){
	Registers.find({},function(err,user){
		if(err) throw err;
		res.json(user);
		// 200, application/json
	});
})
.post(function(req,res){
	Registers.create(req.body/**/,function(err,user){
		if(err) throw err;
		console.log('User added');
		res.writeHead(200,{'content-Type':'text/plain'});
		var id=user._id;
		res.end('Added User : '+id);
	});
});

registerRouter.route('/getbyid')
.post(function (req, res) {
    var id = req.body.id;
    Registers.findById(id, function (err, user) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "get by id", "user": user });
    });
});
registerRouter.route('/edit')
.post(function (req, res) {
    var id = req.body.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var dispname = req.body.dispname;

    Registers.findById(id, function (err, user) {
        if (err) {
            res.json({ "status": "fail", "message": "Something went wrong please try again" });
        }
        else {
            user.firstname = firstname;
            user.lastname = lastname;
            user.username = username;
            user.dispname = dispname;

            user.save(function (err, user) {
                if (err) {
                    res.json({ "status": "fail", "message": "User Profile Not Update Sucessfully" });
                } else {
                    res.json({ "status": "success", "message": "User Profile successfully updated" });
                }
            });
        }
    });
});




registerRouter.route('/Login')
.post(function(req,res){
	var userName=req.body.username;
	var password = req.body.password;
	Registers.find({"username":userName},function(err,user){
	    if (err) resres.json({ "status": "fail", "message": "Something went wrong please try again", "userId": "", "userName": "", "dispName": "" });
		try {
			if(user[0].password===password){
			    res.json({ "status": "success", "message": "success", "userId": user[0]._id, "userName": user[0].username, "dispName": user[0].dispname });
			}
			else{
			    res.json({ "status": "fail", "message": "Invalid Password", "userId": "", "userName": "", "dispName": "" });
			}
		} catch (err) {
		    res.json({ "status": "fail", "message": "Email does not exist", "userId": "", "userName": "", "dispName": "" });
		}
	});
});

registerRouter.route('/ChangePwd')
.post(function (req, res) {
    var userId = req.body.userId;
    var CurrentPwd = req.body.currentPwd;
    var NewPwd = req.body.newPwd;
    Registers.findById(userId, function (err, user) {
        if (err) { res.json({ "status": "fail", "message": "Something went wrong please try again" }); }
        else {
            try {
                if (user.password === CurrentPwd) {
                    user.password = NewPwd;
                    user.save(function (err) {
                        if (err) {
                            res.json({ "status": "fail", "message": "Something went wrong please try again" });
                        } else {
                            res.json({ "status": "success", "message": "Password changed successfully" });
                        }
                    });
                }
                else {
                    res.json({ "status": "fail", "message": "Invalid Current Password" });
                }
            } catch (err) {
                res.json({ "status": "fail", "message": "Something went wrong please try again" });
            }
        }
    });

});
module.exports = registerRouter;