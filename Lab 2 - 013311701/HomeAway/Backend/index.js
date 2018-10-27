var express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var pool = require('./ConnectionPooling.js');
//var MongoClient = require('./DatabaseConnection');
var Model = require('./DatabaseConnection');
//var PropertyDetails = require('./DatabaseConnection');

var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;

//Kafka
var kafka = require('./kafka/client');

//set up cors
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//set up session variable

app.use(session({
    secret: 'cmpe273-homeaway-app',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
}));

app.use(bodyParser.json());

//Allow acceess control headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Storing documents/Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    }
    , filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });


//Login validation
app.post('/login', function (req, res) {

    console.log('Inside login POST');
    console.log('Request Body: ', req.body);

    //Kafka request 

    kafka.make_request('login', req.body, function(err, result){
        console.log('In results login');
        console.log('results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in login!');
        }
        else{
            console.log('Inside results Login');
            if(result){
                res.cookie('cookie', result.FirstName, {
                    maxAge: 360000,
                    httpOnly: false,
                    path: '/'
                });
                res.cookie('Accounttype', result.Accounttype, {
                    maxAge: 360000,
                    httpOnly: false,
                    path: '/'
                });
                req.session.user = result;
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Login successful!');    
            }
            else{
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Invalid Credentials!');
                res.end('Invalid Credentials!');
            }            
        }
    });

    //Query    
});

//Signup
app.post('/signup', function (req, res) {

    console.log('Inside Signup POST');
    console.log('Request Body: ', req.body);

    kafka.make_request('signup', req.body, function(err, result){
        console.log('In results Signup');
        console.log('Results: ', result);
        if(res){
            console.log("User saved successfully.", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Adding a user successful!');
        }
        else{
            console.log("Unable to fetch user details. Error in Signup.", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in fetching user details!');            
        }
    });
});

//Logout

app.post('/logout', function (req, res) {
    console.log('POST LOgout!');
    res.clearCookie('cookie');
    req.session.user = undefined;
    res.writeHead(200, {
        'Content-type': 'text/plain'
    });
    res.end('Back to login!');

});

//Profile Details
app.get('/profile-details', function (req, res) {

    console.log('Inside Profile Details GET!');
    console.log('Request Body:', req.body);

    if (req.session.user) {
        console.log(req.session.user);

        kafka.make_request("profile-details", req, function(err, result){
            if(err){
                console.log("Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in fetching user details!');
            }
            else{
                console.log('Profile Data: ', result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });        
    }
});

//Update Profile data

app.post('/update-profile', function (req, res) {

    console.log('Inside Update Profile POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        kafka.make_request("update-profile", req, function(err, result){

            if(err){
                console.log("Unable to save user details.", err);
                res.writeHead(400, {
                        'Content-type': 'text/plain'
                });
                res.end('Error in adding an user');
            }
            else{
                console.log("User details saved successfully.", result);
                res.writeHead(200, {
                        'Content-type': 'text/plain'
                });
                res.end('Adding a user successful!');
            }
        });        
    }

});


//Post-Property
app.post('/add-property', function (req, res) {

    console.log('Inside Add Property POST!');
    console.log('Request Body: ', req.body);
    const newProperty = req.body;
    const userSession = req.session.user;

    if (req.session.user) {

        kafka.make_request("add-property", req, function(err, result){
            if(err){
                console.log("Error in adding property.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in adding property.');
            }
            else{                
                console.log("Property details saved successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Adding a property successful!');
            }
        });
    }
});

//Search
app.post('/search', function (req, res) {

    console.log('Inside Search Method GET!');
    console.log('Request Body: ', req.body);

    kafka.make_request("search", req, function(err, result){
        if(err){
            console.log('Error in Property search');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Property search');
        }
        else{
            
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            console.log(JSON.stringify(result));
            res.end(JSON.stringify(result));
        }
    });
});

//Get Property Details

app.post('/property-details', function (req, res) {

    console.log('Inside Property Details Method POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        kafka.make_request("property-details", req, function(err, result){
            if(err){
                console.log('Error in Retrieving property Details', err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in Retrieving property Details');
            }
            else{
                console.log(JSON.stringify(result));
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });        
    }

});

//submit Booking

app.post('/submit-booking', function (req, res) {

    console.log('Inside Submit Booking POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        kafka.make_request("submit-booking", req, function(err, result){
            if(err){
                console.log("Unable to save booking details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in adding a booking');
            }
            else{
                console.log('Booking details saved to user details', result);
                res.writeHead(200, {
                        'Content-type': 'text/plain'
                });
                res.end('Booking added successfully! ');
            }
        });

    }

});


//upload-file 

app.post('/upload-file', upload.array('photos', 5), (req, res) => {
    console.log('req.body', req.body);
    res.end();
});

//download-file

app.post('/download-file/:file(*)', (req, res) => {
    console.log('Inside DOwnload File');
    var file = req.params.file;
    var filelocation = path.join(__dirname + '/uploads', file);
    var img = fs.readFileSync(filelocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {
        'Content--type': 'image/jpg'
    });
    res.end(base64img);
});

//Trip - details

app.get('/trip-details', function (req, res) {

    console.log('Inside Trip Details GET!');
    const userSession = req.session.user;

    if (req.session.user) {

        kafka.make_request("trip-details", req, function(err, result){
            if(err){
                console.log("Error in trip details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in trip details');
            }
            else{
                console.log('Trip details', JSON.stringify(result));
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });               
    }


});

//owner dashboard details

app.get('/owner-dashboard-details', function (req, res) {

    console.log('Inside Owner Dashboard Details GET!');

    if (req.session.user) {
        
        kafka.make_request("owner-dashboard", req, function(err, result){
            if(err){
                console.log("Error in Owner dashboard", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in Owner dashboard');
            }
            else{
                console.log('Property details of owner', JSON.stringify(result));
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
                
    }





});


//Mongo Sample



module.exports = app;
app.listen(3001);