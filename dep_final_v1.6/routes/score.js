var express = require('express');
var path = require('path');
var Transform = require('../models/project')
var router = express.Router();
const uuid = require('uuid/v1');


router.post("/projectscore", function (req, res, next) {
    // console.log("hit")
    // console.log("body", req.body)
    if (req.body.projectscore == 'optimize_scores') {
        //console.log("hihit")
        Transform.find({ project_name: req.body.projectname }, { "applications.scores.optimize_scores": 1 }, function (err, docs) {
            if (err)
                res.json(err)
            else
                res.json(docs)
        })
    }
    else if (req.body.projectscore == 'digitalize_scores') {
        Transform.find({ project_name: req.body.projectname }, { "applications.scores.digitalize_scores": 1 }, function (err, docs) {
            if (err)
                res.json(err)
            else
                res.json(docs)
        })
    }
    else if (req.body.projectscore == 'expedite_scores') {
        Transform.find({ project_name: req.body.projectname }, { "applications.scores.expedite_scores": 1 }, function (err, docs) {
            if (err)
                res.json(err)
            else
                res.json(docs)
        })
    }
    else if (req.body.projectscore == 'monetize_scores') {
        Transform.find({ project_name: req.body.projectname }, { "applications.scores.monetize_scores": 1 }, function (err, docs) {
            if (err)
                res.json(err)
            else
                res.json(docs)
        })
    }
    else if (req.body.projectscore == 'innovation_scores') {
        Transform.find({ project_name: req.body.projectname }, { "applications.scores.innovation_scores": 1 }, function (err, docs) {
            if (err)
                res.json(err)
            else
                res.json(docs)
        })
    }

})

router.get('/aggregate/totalapps', (req, res, next) => {
    Transform.aggregate([{
        $project: {
            project_name: 1,
            numberOfApplications: {
                $size: "$applications"
            }
        }
    }], (err, doc) => {
        if (err) res.status(500).json(err)
        else
            res.status(200).json(doc)
    })
})

module.exports = router;