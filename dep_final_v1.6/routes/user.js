//importing
var express = require('express')
var md5 = require('md5')
//Importing route
var router = express.Router();
var user = require('../models/user')
var Project = require('../models/project')


//Routes For Admin 

router.post('/projects/addproject', function (req, res, next) {
    var newProject = new Project(req.body)
    
    newProject.save((err, doc) => {
        if (err)
            res.status(500).json({ 'err': err })

        else {

            res.status(201).json(doc)
        }
    })
}
)
//Route for finding a project by project name
router.get('/projects/pname/:project_name', function (req, res, next) {
    Project.find({ "project_name": req.params.project_name }, (err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find project with given name' })
        else {
            res.status(200).json(doc)
        }
    })
})

//Route for finding a project by project id
router.get('/projects/pid/:project_id', function (req, res, next) {
    Project.find({ "project_id": req.params.project_id }, (err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find project with given name' })
        else {
            res.status(200).json(doc)
        }
    })
})


//Route for user login
router.post('/login', function (req, res, next) {

    user.find({ username: req.body.username }, (err, data) => {
        if (err) res.json(err)
        var pass = req.body.password;
        var authkey1 = "", role1 = ""
        pass = md5(pass).toString()
        for (var i = 0; i < 4; i++) {
            pass += md5(pass).toString()
        }

        if (data != "") {
            if (data[0].password === pass) {
                // console.log("hit")
                var authkey = md5(req.body.username + req.body.password + Math.random())
                user.findOneAndUpdate({ username: req.body.username }, { authkey: authkey }, (err, doc) => {
                    if (err) res.status(500).json(err)
                    authkey1 = doc.authkey;
                    role1 = doc.role;
                    project_name = doc.project_name;
                    username = doc.username;
                    // console.log(doc.authkey)

                    res.status(200).json({ role: role1, authkey: authkey1, project_name: project_name, username: username })
                })
            }
            else if(data[0].password != pass){
                res.json({ role: 'invalid User' })
            }
        }
        else res.json({ role: 'invalid User' })



    })
})


//Route for adding user
router.post('/', function (req, res, next) {


    var pass = req.body.password;
    pass = md5(pass).toString()
    for (var i = 0; i < 4; i++) {
        pass += md5(pass).toString()
    }
    var authkey = md5(req.body.username + req.body.password + Math.random())
    var newUser = new user({
        project_name: req.body.project_name,
        user_email: req.body.user_email,
        username: req.body.username,
        password: pass,
        role: req.body.role,
        authkey: authkey
    })
    var obj = {
        project_name: req.body.project_name,
        user_email: req.body.user_email,
        username: req.body.username,
        password: pass,
        role: req.body.role,
        authkey: authkey
    }

    newUser.save((err, doc) => {
        if (err) res.status(500).json(err)
        else {
            Project.findOneAndUpdate({ "project_name": req.body.project_name }, { $push: { "project_users": newUser } }
                , (err, doc) => {

                    res.status(200).json(doc)

                }
            )
        }

    })
})


//Route for updating user
router.put('/users/:id', function (req, res, next) {
    var pass = req.body.password;
    pass = md5(pass).toString()
    for (var i = 0; i < 4; i++) {
        pass += md5(pass).toString()
    }
    var authkey = md5(req.body.username + req.body.password + Math.random())
    obj = {
        project_name: req.body.project_name,
        user_email: req.body.user_email,
        username: req.body.username,
        password: pass,
        role: req.body.role,
        authkey: authkey
    }


    user.findByIdAndUpdate(req.params.id, obj, function (err, doc) {
        if (err) res.status(500).json({ msg: "Unable to edit" })
        else {
            res.status(200).json({ msg: "Successfully edited" })


        }
    })
    // user.findByIdAndUpdate(req.params.id, obj, function (err, doc) {
    //     if (err) res.status(500).json({ msg: "Unable to edit" })
    //     else {
    //         Project.findOneAndUpdate({"project_users._id":req.params.id},{ $push:{"project_users.$":obj}}, (err, doc) => {
    //             res.status(200).json({ msg: "Successfully edited" })

    //         })

    //     }
    // })



})

//Route for deleting user 
router.delete("/users/:id", function (req, res, next) {

    user.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.status(500).json({ msg: "Unable to delete" })
        else {

            res.status(200).json({ msg: "Successfully Deleted" })

        }
    })

})

//Deleting user from project
// router.delete("/users/delete/:id", function (req, res, next) {

//     Project.findOneAndRemove({ "project_users._id": req.params.id }, function (err) {
//         if (err) res.status(500).json({ msg: "Unable to delete" })
//         else {

//             res.status(200).json({ msg: "Successfully Deleted" })

//         }
//     })

// })


//Route for geting specific user by id
router.get("/users/:id", function (req, res, next) {

    user.findById(req.params.id, function (err, doc) {
        if (err) res.status(500).json({ msg: "Unable to Find" })
        else {

            res.status(200).json(doc)

        }
    })

})

//4.Route for getting all the projects
router.get('/projects', function (req, res, next) {
    Project.find((err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find projects' })

        else {

            res.status(200).json(doc)
        }
    }).sort({ "start_date": 1 ,"versions":-1})
}
)

router.get('/projects/latest', function (req, res, next) {

    Project.find({"version_flag":false},(err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find projects' })

        else {

            res.status(200).json(doc)
        }
    }).sort({ "start_date": 1 })
}
)

// Route for getting all the users
router.get('/users', function (req, res, next) {
    user.find((err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find users' })

        else {

            res.status(200).json(doc)
        }
    })
}
)

//5.Route for getting specific project
router.get('/projects/:id', function (req, res, next) {
    Project.findById(req.params.id, (err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to find project with given ID' })

        else {

            res.status(200).json(doc)
        }
    })
}
)

//6.Route for adding new project




//7.Route for updating the project details
router.put('/projects/:id', function (req, res, next) {
    // var newProject = new Project(req.body)
    // console.log("id",req.params.id)
    Project.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err)
            res.status(500).json({ msg: 'unable to edit project' })

        else {

            res.status(201).json({ msg: 'Successfully Edited' })
        }
    })
}
)


//Route for deleting the project
router.delete('/projects/:id', function (req, res, next) {

    Project.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err)
            res.status(500).json({ msg: 'unable to delete project' })

        else {
            res.status(200).json({ msg: "successfully deleted" })
        }
    }
    )
})

//Route for adding the attributes
router.put('/projects/attributes/:id', function (req, res, next) {
    // var newProject = new Project(req.body)
    
    Project.findByIdAndUpdate(req.params.id, { "attribute_details": req.body }, (err, doc) => {
        // console.log("body", req.body)
        if (err)
            res.status(500).json({ msg: 'unable to edit project' })

        else {
// console.log("doc",doc)
            res.status(201).json(doc)
        }
    })
}
)
module.exports = router
