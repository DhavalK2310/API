var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Projectsmeta = require('../models/projectmetaschema');
var Projects = require('../models/projectschema');

var projectmetaRouter = express.Router();
projectmetaRouter.use(bodyParser.json());

projectmetaRouter.route('/')
.get(function (req, res) {
    Projectsmeta.find({}, function (err, project) {
        if (err) throw err;
        res.json(project);
        // 200, application/json
    });
})

// Input {"Block":"G-601","Size":"23x10","Area":"273","AreaUnit":"sq ft","ProjId":"58afc33c6f1c8f19a095808e"} or[{"Block":"G-602","Size":"23x10","Area":"273","AreaUnit":"sq ft","ProjId":"58afc33c6f1c8f19a095808e"},{"Block":"G-603","Size":"23x10","Area":"273","AreaUnit":"sq ft","ProjId":"58afc33c6f1c8f19a095808e"}]

// Output {"status": "success","message": "Office added successfully"}
.post(function (req, res) {
    Projectsmeta.create(req.body/**/, function (err, project) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "Office added successfully" });
    });
});

projectmetaRouter.route('/getbyid')
.post(function (req, res) {
    var id = req.body.Id;
    try {
        Projectsmeta.findById(id, function (err, office) {
            if (err) res.json({ "status": "fail", "message": "Something went wrong please try again", "office": "" });
            res.json({ "status": "success", "message": "success", "office": office });
        });
    } catch (err) {
        res.json({ "status": "fail", "message": "Something went wrong please try again", "office": "" });
    }
});

//----Input Perameter {"Id":"58b42f324b539622fcddaa63","Block":"G-603","Size":"23x10","Area":"270","AreaUnit":"sq.Feet","ProjId":"58b42ad44b539622fcddaa61"}
//----Output Perameter {"status": "success","message": "Office/Block Num changed successfully"}
projectmetaRouter.route('/edit')
.post(function (req, res) {
    var id = req.body.Id;
    var block = req.body.Block;
    var size = req.body.Size;
    var area = req.body.Area;
    var areaunit = req.body.AreaUnit;
    var projId = req.body.ProjId;

    try {
        Projectsmeta.findById(id, function (err, projmeta) {
            if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
            else {
                projmeta.Block = block;
                projmeta.Size = size;
                projmeta.Area = area;
                projmeta.AreaUnit = areaunit;
                projmeta.ProjId = projId;

                projmeta.save(function (err) {
                    if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
                    else { res.json({ "status": "success", "message": "Office/Block Num changed successfully" }); }
                })
            }
        });
    } catch (err) {

    }
});

//---Input Perameter {"Id":"58b42f324b539622fcddaa63"}
//---Output Perameter {"status": "success","message": "Office/Block Num Deleted Successfully"}
projectmetaRouter.route('/remove')
.post(function (req, res) {
    var id = req.body.Id;
    Projectsmeta.remove({ _id: id }, function (err, doc) {
        if (err) res.json({ "status": "fail", "message": "Something went wrong please try again" });
        res.json({ "status": "success", "message": "Office/Block Num Deleted Successfully" });
    });
});
module.exports = projectmetaRouter;