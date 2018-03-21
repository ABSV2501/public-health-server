const route = require("express").Router();
const path = require("path");
const PythonShell = require("python-shell");
const multer = require("multer");
const fs = require("fs");

let Storage = multer.diskStorage({
    destination: './public_static/csv',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

let upload = multer({storage: Storage});
route.get("/",(req,res) => {
    res.redirect("/govt.html");
});

route.post('/infrastructure',upload.single('csv'),(req,res)=>{

    let options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3.5',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname,"../../"),
        args: [path.join(__dirname, "../../public_static/csv/", req.file.filename),path.join(__dirname, "../../", "model_infra.sav" ),path.join(__dirname,"../../","public_static/csv","infra_res.csv")]
    };
    PythonShell.run('prediction_infra.py', options, function (err, results) {
        if (err) console.log( err);
        // results is an array consisting of messages collected during execution
        console.log('results: ', results);
        let file = path.join(__dirname,'../../public_static/csv/infra_res.csv');
        //
        // res.setHeader('Content-Length', file.length);
        // res.write(file, 'binary');
        // res.end();
        res.download(file);
    });

});
route.post('/rating',upload.single('csv'),(req,res)=>{
    let options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3.5',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname,"../../"),
        args: [path.join(__dirname, "../../public_static/csv/", req.file.filename),path.join(__dirname, "../../", "model_rating.sav" ),path.join(__dirname,"../../","public_static/csv","rating_res.csv")]
    };
    PythonShell.run('prediction_rating.py', options, function (err, results) {
        if (err) console.log( err);
        // results is an array consisting of messages collected during execution
        console.log('results: ', results);
        let file = path.join(__dirname,'../../public_static/csv/rating_res.csv');
        //
        // res.setHeader('Content-Length', file.length);
        // res.write(file, 'binary');
        // res.end();
        res.download(file);
    });
});

module.exports = route;