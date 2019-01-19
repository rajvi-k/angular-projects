var express = require('express');
var path = require('path');
var Transform = require('../models/project')
var router = express.Router();
const uuid = require('uuid/v1');

router.get("/allscores", function (req, res, next) {
    console.log("entered all scores")

    Transform.find({}, { "applications.application_name": 1, "applications.scores.optimize_scores": 1, "applications.scores.digitalize_scores": 1, "applications.scores.expedite_scores": 1, "applications.scores.monetize_scores": 1, "applications.scores.innovation_scores": 1, }, function (err, docs) {
        if (err) {
            res.json(err)
            // console.log("Error!!!")
        }
        else {
            res.json(docs)
            // console.log("all the scores", docs)
        }
    })
})

router.post("/allscores", function (req, res, next) {
    // console.log("entered all scores")
    // console.log(req.body);
    Transform.find({ "project_name": req.body.project_name }, { "applications.application_name": 1, "applications.scores.optimize_scores": 1, "applications.scores.digitalize_scores": 1, "applications.scores.expedite_scores": 1, "applications.scores.monetize_scores": 1, "applications.scores.innovation_scores": 1, }, function (err, docs) {
        if (err) {
            res.json(err)
            // console.log("Error!!!")
        }
        else {
            res.json(docs)
            // console.log("all the scores", docs)
        }
    })
})

router.get("/allprojectnames", function (req, res, next) {
    // console.log("entered all proj names")

    Transform.find({}, { "project_name":1 }, function (err, docs) {
        if (err) {
            res.json(err)
            // console.log("Error!!!")
        }
        else {
            res.json(docs)
            // console.log("all the projects", docs)
        }
    })
})

// router.get("/appscores", function (req, res, next) {
//     console.log("entered all scores")

//     Transform.find({ }, { "applications.application_name" : 1,"applications.scores.optimize_scores": 1, "applications.scores.digitalize_scores": 1, "applications.scores.expedite_scores": 1, "applications.scores.monetize_scores": 1, "applications.scores.innovation_scores": 1,  }, function (err, docs) {
//         if (err)
//             res.json(err)
//         else{
//             res.json(docs)
//             console.log("all the scores", docs)
//         }
//     })
// Transform.aggregate([{
//     $project: {
//         project_name: 1,
//         numberOfApplications: {
//             $size: "$applications"
//         }
//     }
// }], (err, doc) => {
//     if (err) res.status(500).json(err)
//     else
//         res.status(200).json(doc)
// })
// })

module.exports = router;