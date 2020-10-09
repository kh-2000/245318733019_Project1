var express = require("express");
var MongoClient = require("mongodb");
const bodyParser = require("body-parser");

let server=require('./server');
let config=require('./config');
let middleware=require('./middleware');

var app = express();

const url = "mongodb://127.0.0.1:27017";
const dbname = 'HospitalInventory';
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let db

MongoClient.connect(url,(err,client) =>{
    if(err) return console.log(err);
    db = client.db(dbname);
    console.log(`Connected Database: ${url}`);
    console.log(`Database:${dbname}`);
});

//GET
app.get('/hospital',middleware.checkToken, (req,res) => {
    console.log("Fetching data from hospital collection.....");
    var data = db.collection("Hospital").find().toArray().then(result => res.json(result));
});
app.get('/ventilator', middleware.checkToken, (req,res) => {
    console.log("Fetching data from ventilator collection.....");
    var data = db.collection("Ventilator").find().toArray().then(result => res.json(result));
});

//SEARCH
app.post('/ventilatorstatus',middleware.checkToken,(req,res) =>{
    var status = req.body.status;
    var data = db.collection("Ventilator").find({"status":status}).toArray().then(result=>res.json(result));
    console.log(status);
});
app.post('/hospitalname',middleware.checkToken,(req,res) =>{
    var name = req.body.name;
    var data = db.collection("Hospital").find({"name":new RegExp(name, 'i')}).toArray().then(result=>res.json(result));
    console.log(name);
});

//CREATE
app.post('/addventilator',middleware.checkToken, (req, res) => {
    var hId = req.body.hId;
    var ventilatorId = req.body.ventilatorId;
    var status = req.body.status;
    var name = req.body.name;
    console.log('Adding ventilator.....');
    var add = {"hId":hId, "ventilatorId":ventilatorId,"status":status,"name":name};
    var data = db.collection("Ventilator").insertOne(add, (err, result) => {
        if (err) throw err;
        res.json("Ventilator added!");

    });
});
app.post('/addhospital',middleware.checkToken, (req, res) => {
    var hId = req.body.hId;
    var name = req.body.name;
    var address = req.body.address;
    var contactNo = req.body.contactNo;
    console.log('Adding hospital.....');
    var add = {"hId":hId, "name":name,"address":address,"contactNo":contactNo};
    var data = db.collection("Hospital").insertOne(add,(err, result) => {
        if (err) throw err;
        res.json("Hospital added!");

    });
});

//UPDATE
app.put('/updateventilator',middleware.checkToken, (req, res) => {
    var ventilatorId = req.body.ventilatorId;
    console.log(ventilatorId);
    var status = req.body.status;
    console.log(status);
    var data = db.collection("Ventilator").updateOne({ "ventilatorId": ventilatorId }, { $set: { "status": status } }, (err, result) => {
        if (err) throw err;
        res.json("Updated ventilator!");

    });
});
app.put('/updatehospital',middleware.checkToken, (req, res) => {
    var hId = req.body.hId;
    console.log(hId);
    var name = req.body.name;
    console.log(name);
    var data = db.collection("Hospital").updateOne({ "name": name }, { $set: { "hId": hId } }, (err, result) => {
        if (err) throw err;
        res.json("Updated hospital!");

    });
});


//DELETE
app.delete('/deleteventilator',middleware.checkToken, (req, res) => {
    var ventilatorId = req.body.ventilatorId;
    console.log(ventilatorId);
    var data = db.collection("Ventilator").deleteOne({ "ventilatorId": ventilatorId }, (err, obj) => {
        if (err) throw err;
        res.json("Ventilator deleted!!");

    });
});
app.delete('/deletehospital', middleware.checkToken, (req, res) => {
    var hId = req.body.hId;
    console.log(hId);
    var data = db.collection("Hospital").deleteOne({ "hId": hId }, (err, obj) => {
        if (err) throw err;
        res.json("Hospital deleted!!");

    });
});


app.listen(2000);