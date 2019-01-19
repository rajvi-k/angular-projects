const express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var mkdirp = require('mkdirp');
//var app = express()

var storage = multer.diskStorage({
    // destination

    destination: function (req, file, cb) {
        var stat = null;
        // console.log("body",req.body.path)
        console.log("file", file)
        var newdestination = 'uploads/'
        var newpath = path.join(newdestination, req.body.path)
        console.log("new path", newpath, req.body.path)
        //console.log("path join",path.join(newdestination,req.body.path))

        mkdirp.sync(newpath);
        if (fs.existsSync(newpath)) {

            console.log("exist")
        }
        else {

            mkdirp(newpath, function (err) {
                if (err) console.log("err", err);
                else {
                    console.log("outside try catch", 'made!')
                    console.log("outside try catch ", newpath)
                }
            });
        }
        //console.log(newpath)

        try {
            stat = fs.statSync(newpath);
            console.log("inside try  ", newpath)
            console.log("stat", stat)
        } catch (err) {
            mkdirp(newpath, function (err) {
                console.log("inside catch  ", newpath)
                if (err) console.log("err", err);
                else {
                    console.log('made!')
                }
            });
            console.log("errr", err)
            //fs.mkdirSync(newpath);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }

        cb(null, newpath)
    },
    filename: function (req, file, cb) {
        //  console.log("inside cb", req)

        cb(null, file.originalname);
        // console.log("inside cb", file.originalname)
    }
});


var upload = multer({ storage: storage, limits: { fileSize: 800000 } });

router.post("/", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files.filename);
    console.log("req.body", req.body.path)
    res.send(req.files);
});

router.get('/download/:id', function (req, res) { // create download route
    var path = require('path'); // get path
    var dir = path.resolve(".") + '/uploads/' + req.params.id; // give path
    fs.readdir(dir, function (err, list) { // read directory return  error or list
        if (err) return res.json(err);
        else
            res.json(list);
    });
});
// Add this route for download it

router.get('/:file(*)', function (req, res, next) { // this routes all types of file
    var path = require('path');
    var file = req.params.file;
    // var list =req.params.list;
    var path = path.resolve(".") + '/uploads/' + file;
    res.download(path); // magic of download fuction

});

// router.get('/:file(*)', function(req, res, next){ // this routes all types of file
//     var path=require('path');
//     var file = req.params.file;
//     var path = path.resolve(".")+'/uploads/'+file;
//     res.download(path); // magic of download fuction

//   });

module.exports = router;