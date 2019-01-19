
const express = require('express');
var path = require('path');
var Transform = require('../models/project')
var router = express.Router();
const uuid = require('uuid/v1');

//total no of application group by project id
router.get('/aggregate/totalapps', (req, res, next) => {
    Transform.aggregate([{
        $project: {
            project_id: 1,
            project_name: 1,
            description: 1,
            project_budget: 1,
            project_type: 1,
            start_date: 1,
            delivery_date: 1,
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

//get single application 
router.get('/pname/:project_name', (req, res, next) => {
    Transform.find({ project_name: req.params.project_name }, (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            // console.log("req", docs)
            res.json(docs);
        }
    });
});

router.get('/:proj_id/:app_id', (req, res, next) => {

    Transform.findOne({ "project_id": req.params.proj_id, "applications.application_id": req.params.app_id }, "applications.$", (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            // console.log("singlke", docs)
            res.json(docs);
        }
    });
});
//get project id
router.get('/p/prname/:project_name', (req, res, next) => {
    Transform.findOne({ 'project_name': req.params.project_name }, { '_id': 0, 'project_name': 1, 'project_id': 1 }, (err, result) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            // console.log("req", result)
            res.json(result);
        }
    })
})

//getting appp by its name

router.get('/:proj_name/application/:app_name', (req, res, next) => {

    Transform.findOne({ "project_name": req.params.proj_name, "applications.attribute_details.value": req.params.app_name }, "applications.$", (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            // console.log("singlke", docs)
            res.json(docs);
        }
    });
});

//getting total no of project
router.get('/count', (req, res, next) => {
    Transform.count((err, result) => {
        if (err)
            res.status(500).json(err);
        else
            res.status(200).json(result);
    })
})

//get all projects
router.get('/', (req, res, next) => {
    Transform.find((err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            // console.log("all", docs)
            res.json(docs);
        }
    });
}); 

//get single project 
router.get('/:proj_id', (req, res, next) => {
    Transform.find({ project_id: req.params.proj_id }, (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            // console.log("req", docs)
            res.json(docs);
        }
    });
});


// Add SINGLE app --do not include  applications: in request body--do not include [] -- app in old project
router.put('/:proj_id', (req, res, next) => {


    Transform.update({ project_id: req.params.proj_id }, { $push: { applications: req.body } }, (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {

            res.json(docs);
        }
    })
})

router.put('/multiple/:proj_name', (req, res, next) => {
    Transform.update({ project_name: req.params.proj_name }, { $push: { applications: { $each: req.body.data } } }, (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve App data', error: err })
        }
        else {
            res.json(docs);
        }
    })
    // console.log("mapping =", req.body.map)
    var d = new Date();
    req.body.map.date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    // console.log("req.body.map.date", req.body.map.date);
    Transform.findOneAndUpdate({ project_name: req.params.proj_name }, { $push: { map_config: req.body.map } }, (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retreive App Data', error: err })
        }
        else {
            res.json({done:true});
            // console.log("docs");
        }
    })
})


//adding app by projeect name
// Add SINGLE app --do not include  applications: in request body--do not include [] -- app in old project
router.put('/pname/temp/:proj_name', (req,  res,  next)  =>  {
    // console.log("Hey Awesome")
    // var id = req.params.proj_name + "-" + (Math.random() * ((100 - 1) + 1))
    var  data  =  req.body.data;
    var  resarr  =  [];
    var  diffarr  =  [];
    var  abc  =  "";
    var  attribs  =  req.body.attribs;
    for  (let  i  =  0;  i  <  data.length;  i++) {

        abc  =  abc  +  rotat(attribs,  data[i])  +  ",";
    }
    // console.log("abc = ",abc);
    abc  =  "[" + abc.slice(0, -1) + "]";
    abc  =  JSON.parse(abc)
    res.send(abc);
})
function  rotat(attribs,  data) {
    for  (var  at  of  attribs) {
        at.value  =  data[at.key];
    }
    return  JSON.stringify(attribs);
}

router.put('/pname/excelinc/:proj_name', (req, res, next) => {
    // console.log("Incremental");
    var apps = req.body.data;
    for (let i = 0; i < apps.length; i++) {
        // console.log("Single single = ", apps[i]);
        getAppData(apps[i].name, req.params.proj_name, i, apps)
    }
    res.json({done:true});
})
function getAppData(appName, pname, i, apps) {
    Transform.findOne({ "project_name": pname, "applications.application_name": appName }, "applications.$", (err, docs) => {
        if (docs === null || docs === undefined || docs === "") {
            // console.log("docs = ", docs)
        }
        else {
            // console.log("Docs[0]", docs.applications[0])
            // console.log("Docs = ", docs.applications[0].attribute_details)
            var obj = docs.applications[0].attribute_details
            for (var one_attr of obj) {
                if (apps[i][one_attr.key] === undefined) {
                }
                else {
                    // console.log(apps[i][one_attr.key]);
                    one_attr.value = apps[i][one_attr.key];
                }
            }
            // console.log("Final obj = ", obj);
            Transform.findOneAndUpdate({ "project_name": pname, "applications.application_name": appName }, { "applications.$.attribute_details": obj }, (err, docs) => {
                if (err) console.log(err)
                // if (docs) console.log('done')

            })
        }

    })
}

// router.put('/pname/:proj_name',(req,res,next)=>{
//     let id = uuid();
//     var data = {

//         "scores": {
//             "optimize_scores": {
//                 "stability": "",
//                 "maturity": "",
//                 "availibility_score": "",
//                 "scalability_score": "",
//                 "cloud_applicabilty_score": "",
//                 "current_cloud_score": "",
//                 "redundency_score": "",
//                 "license_optimization_score": "",
//                 "consolidation_score": "",
//                 "technical_debt_score": ""
//             },
//             "digitalize_scores": {
//                 "straight_through_processing_adoption_score": "",
//                 "api_applicability_score": "",
//                 "current_api_adoption_score": "",
//                 "technology_obsolecence": "",
//                 "mobility_enablement_scope": "",
//                 "current_mobility_adoption_level": "",
//                 "self_service_adoption": ""
//             },
//             "expedite_scores": {
//                 "testing_automation_adoption": "",
//                 "devops_applicability_score": "",
//                 "current_dev_ops_adoption_score": ""
//             },
//             "monetize_scores": {
//                 "unique_functionality": "",
//                 "registered_as_ip": "",
//                 "current_roi_realization_model": "",
//                 "market_potential": "",
//                 "ease_of_monetization": "",
//                 "monetization_model": ""
//             },
//             "innovation_scores": {
//                 "ai_or_ml_applicability": "",
//                 "chat_bot_applicability": "",
//                 "rpa_applicability_score": "",
//                 "block_chain_applicability_score": ""
//             }
//         },
//         "application_id": id,
//         "application_name": "",
//         "score_category_completion": [
//             {

//                 "completed_fields": "",
//                 "total_fields": 10,
//                 "category_type": "optimize_scores"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 7,
//                 "category_type": "digitalize_scores"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 3,
//                 "category_type": "expedite_scores"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 6,
//                 "category_type": "monetize_scores"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 4,
//                 "category_type": "innovation_scores"
//             }
//         ],
//         "attribute_details": [],
//         "attribute_category_completion": [
//             {

//                 "completed_fields": "",
//                 "total_fields": 23,
//                 "category_type": "general_attributes"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 6,
//                 "category_type": "integration_attributes"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 3,
//                 "category_type": "ticket_attributes"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 10,
//                 "category_type": "custom_applications_attributes"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 0,
//                 "category_type": "package_attributes"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 2,
//                 "category_type": "classification_attributes"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 2,
//                 "category_type": "application_type"
//             },
//             {

//                 "completed_fields": "",
//                 "total_fields": 5,
//                 "category_type": "other"
//             }
//         ]
//     }
//     //seting inner body
//     req.body[0].value = id;
//     // console.log("app is :",req.body);
//     Transform.update({ project_name: req.params.proj_name }, { $push: { applications: data } }, (err, docs) => {
//         if (err) {
//             console.log(err);
//             res.json({ message: 'Unable to retrieve App data', error: err })
//         }
//         else {
//             Transform.update({ project_name: req.params.proj_name, "applications.application_id": id }, { $set: { "applications.$.attribute_details": req.body } }, (err, docs) => {
//                 if (err) {
//                     console.log(err);
//                     res.json({ message: 'Unable to retrieve App data', error: err })
//                 }
//                 else {
//                     console.log("done");
//                     res.json("done")
//                 }
//             })
//         }
//     })
// })
//edit app

router.put('/:proj_id/:app_id', (req, res, next) => {

    // console.log("harsh here")
    delete req.body._id
    Transform.update({ project_id: req.params.proj_id, "applications.application_id": req.params.app_id }, { $set: { "applications.$": req.body } }, (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve app data', error: err })
        }
        else {
            // console.log(req.body)
            res.json(docs);

        }
    })
})


//add scores
router.put('/:proj_id/:app_id/scores', (req, res, next) => {
    Transform.findOneAndUpdate({ "project_id": req.params.proj_id, "applications.application_id": req.params.app_id }, { "applications.$.scores": req.body }, (err, docs) => {
        if (err) {
            // console.log(err);
            res.json({ message: 'Unable to retrieve app data', error: err })
        }
        else {
            // console.log(req.body)
            res.json(docs);

        }
    })
})
//Delete movie by Id
//DELETE /:id
router.delete("/:proj_id/:app_id", (req, res, next) => {
    Transform.update({ project_id: req.params.proj_id, "applications.application_id": req.params.app_id }, { $pull: { applications: { "application_id": req.params.app_id } } }, (err, doc) => {
        if (err) {
            res.json({ message: "Error in deleting App", error: err })
        } else {
            res.json({ message: "App deleted successfully", movie: doc })
        }
    });
});

router.delete("/:proj_id/:application_id", (req, res, next) => {
    Transform.update({ project_id: req.params.proj_id }, { $pull: { applications: { "application_id": req.params.application_id } } }, (err, doc) => {
        if (err) {
            res.json({ message: "Error in deleting App", error: err })
        } else {
            res.json({ message: "App deleted successfully", movie: doc })
        }
    });
});

router.get('/aggregate/categories/:_id', (req, res, next) => {


    Transform.distinct("attribute_details.category_type", {

        _id: req.params._id

    }


        , (err, doc) => {

            if (err) res.status(500).json(err)

            else

                res.status(200).json(doc)

        })

})
module.exports = router;
