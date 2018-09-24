var express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var pool = require('./ConnectionPooling.js');

var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

var mysql = require('mysql');

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

var locationDetails = {
    country: "",
    streetAddress: "",
    unitNumber: "",
    city: "",
    state: "",
    zipCode: ""
};

var details = {
    propertyType: "",
    bedrooms: "",
    accomodates: "",
    bathrooms: ""
};

var photos = [{
    photo: ""
}];

var pricingDetails = {
    startDate: "",
    endDate: "",
    currency: "",
    baserate: "",
    minStay: ""
}


var PropertyDetails = {

    LocationDetails: locationDetails,
    Details: details,
    Photos: photos,
    PricingDetails: pricingDetails

};

var PropertyRepo = [];


//Login validation



app.post('/login', function (req, res) {

    console.log('Inside login POST');
    console.log('Request Body: ', req.body);

    //Query

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            //Login validation query
            var sql = 'SELECT * from userdetails WHERE Username = ' + mysql.escape(req.body.Email) +
                'AND Password = ' + mysql.escape(req.body.Password);

            conn.query(sql, function (err, result) {

                if (err) {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Invalid Credentials!');
                }
                else {
                    console.log(result);
                    res.cookie('cookie', result[0].Firstname, {
                        maxAge: 360000,
                        httpOnly: false,
                        path: '/'
                    });
                    req.session.user = result[0];
                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    })
                    res.end('Login successful!');
                }
            });
        }
    });
});

//Signup
app.post('/signup', function (req, res) {

    console.log('Inside Signup POST');
    console.log('Request Body: ', req.body);

    //User creation query
    var sql = 'INSERT into userdetails (Username, Password, Firstname, Lastname, Email) VALUES(' +
        mysql.escape(req.body.Email) + ',' +
        mysql.escape(req.body.Password) + ',' +
        mysql.escape(req.body.FirstName) + ',' +
        mysql.escape(req.body.LastName) + ',' +
        mysql.escape(req.body.Email) + ');';

    pool.getConnection(function (err, conn) {

        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            conn.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in adding an user');
                }
                else {
                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Adding a user successful!');
                }
            });

            conn.release();
        }
    });
});


//Profile Details
app.get('/profile-details', function(req, res){

    console.log('Inside Profile Details GET!');
    console.log('Request Body:', req.body);

    pool.getConnection(function(err, conn){
        if(err){
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');

        }
        else{

            //Profile Details query
            var sql = 'SELECT * from userdetails where ProfileId = ' + mysql.escape(req.session.user.ProfileId);

            conn.query(sql, function(err, result){
                if(err){
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in retrieving profile data');                                        
                }
                else{
                    console.log('Profile Data: ', result);
                    res.writeHead(200, {
                        'Content-type': 'application/json'
                    });
                    res.end(JSON.stringify(result[0]));  
                }
            });
        }
    });

});


//Post-Property
app.post('/add-property', function (req, res) {

    console.log('Inside Add Property POST!');
    console.log('Request Body: ', req.body);


    //if(req.session.user){       

    const newProperty = req.body;
    PropertyRepo.push(newProperty);
    console.log(PropertyRepo);
    //}

});

//Search
app.get('/search', function (req, res) {

    console.log('Inside Search Method GET!');
    //console.log('Request Body: ', req.body);
    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    console.log(JSON.stringify(PropertyRepo));
    res.end(JSON.stringify(PropertyRepo));
});


//uplaod-file 

app.post('/upload-file', upload.any(), (req, res) => {
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

app.get('/test-db', function (req, res) {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test"
    });

    con.connect(function (err) {
        if (err) {
            throw err;
        }

        console.log('connected');

    });

    var sql = "insert into test values(2, 'HARI', 'LN',24)";
    con.query(sql, function (err, result) {
        console.log(result);
    });
    sql = "insert into test values(2, 'HARI', 'LN',24)";
    con.query(sql, function (err, result) {
        console.log(result);
    });

});

app.listen(3001);