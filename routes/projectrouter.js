var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');
var Projects = require('../models/projectschema');

var app = express();
var projectRouter = express.Router();
projectRouter.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

projectRouter.route('/')
.get(function(req,res){
    Projects.find({}, function (err, project) {
		if(err) throw err;
		res.json(project);
		// 200, application/json
	});
})
.post(function(req,res){
    Projects.create(req.body/**/, function (err, project) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "Project added successfully" });
	});
});

projectRouter.route('/remove')
.post(function (req, res) {
    var id = req.body.id;
    Projects.remove({ _id: id }, function (err, doc) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "Project Deleted Successfully" });
    });
});

projectRouter.route('/getbyid')
.post(function (req, res) {
    var id = req.body.id;
    
    try {
        Projects.findById(id, function (err, proj) {
            if (err) res.json({ "status": "fail", "message": "Something went wrong please try again", "project": "" });
            res.json({ "status": "success", "message": "success", "project": proj });
            //res.end(project);
        });
    } catch (err) {
        res.json({ "status": "fail", "message": "Something went wrong please try again", "project": "" });
    }
    
});

projectRouter.route('/edit')
.post(function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var address = req.body.address;
    var city = req.body.city;
    try {
        
        Projects.findById(id, function (err, proj) {
            if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
            else {
                proj.name = name;
                proj.address = address;
                proj.city = city;

                proj.save(function (err) {
                    if (err) { res.json({ "status": "fail", "message": "Something went wrong please try again" }); }
                    else { res.json({ "status": "success", "message": "Project changed successfully" }); }
                })
            }
        });

    } catch (err) {
        res.json({ "status": "fail", "message": "Something went wrong please try again"});
    }

});

module.exports = projectRouter;
