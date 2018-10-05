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
                    res.cookie('Accounttype', result[0].Accounttype, {
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

    var presql = 'SELECT ProfileId from userdetails where Username = ' + mysql.escape(req.body.Email);

    pool.getConnection(function (err, conn) {

        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            conn.query(presql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in adding an user');
                }
                else {
                    if (result[0]) {                        
                        var sql = 'UPDATE userdetails set Accounttype = 3';
                    }
                    else{
                        var sql = 'INSERT into userdetails (Username, Password, Firstname, Lastname, Email, Accounttype) VALUES(' +
                        mysql.escape(req.body.Email) + ',' +
                        mysql.escape(req.body.Password) + ',' +
                        mysql.escape(req.body.FirstName) + ',' +
                        mysql.escape(req.body.LastName) + ',' +
                        mysql.escape(req.body.Email) + ',' +
                        mysql.escape(req.body.Accounttype) + ');';
                    }
                    

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
                }
            });

        }
    });
});

//Logout

app.post('/logout', function (req, res) {
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

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');

        }
        else {

            //Profile Details query
            var sql = 'SELECT * from userdetails where ProfileId = ' + mysql.escape(req.session.user.ProfileId);

            conn.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in retrieving profile data');
                }
                else {
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

//Update Profile data

app.post('/update-profile', function (req, res) {

    console.log('Inside Update Profile POST!');
    console.log('Request Body: ', req.body);

    pool.getConnection(function (err, conn) {

        if (err) {

            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');

        }
        else {

            var sql = 'UPDATE userdetails set ' +
                'Firstname = ' + mysql.escape(req.body.Firstname) + ',' +
                'Lastname = ' + mysql.escape(req.body.Lastname) + ',' +
                'Email = ' + mysql.escape(req.body.Email) + ',' +
                'Phonenumber = ' + mysql.escape(req.body.Phonenumber) + ',' +
                'Aboutme= ' + mysql.escape(req.body.Aboutme) + ',' +
                'Country = ' + mysql.escape(req.body.Country) + ',' +
                'City = ' + mysql.escape(req.body.City) + ',' +
                'Gender = ' + mysql.escape(req.body.Gender) +
                ' WHERE ProfileId = ' + req.session.user.ProfileId;

            conn.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in updating profile data');

                }
                else {
                    console.log('Profile data update complete!');
                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Profile data update complete!');
                }
            });

        }
    });

});


//Post-Property
app.post('/add-property', function (req, res) {

    console.log('Inside Add Property POST!');
    console.log('Request Body: ', req.body);
    const newProperty = req.body;
    const userSession = req.session.user;

    pool.getConnection(function (err, conn) {

        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            //session = session.ProfileId;
            var sql = 'INSERT into propertydetails values(NULL,' +
                mysql.escape(newProperty.LocationDetails.country) + ',' +
                mysql.escape(newProperty.LocationDetails.streetAddress) + ',' +
                mysql.escape(newProperty.LocationDetails.unitNumber) + ',' +
                mysql.escape(newProperty.LocationDetails.city) + ',' +
                mysql.escape(newProperty.LocationDetails.state) + ',' +
                mysql.escape(newProperty.LocationDetails.zipCode) + ',' +
                mysql.escape(newProperty.Details.headline) + ',' +
                mysql.escape(newProperty.Details.description) + ',' +
                mysql.escape(newProperty.Details.propertyType) + ',' +
                mysql.escape(newProperty.Details.bedrooms) + ',' +
                mysql.escape(newProperty.Details.accomodates) + ',' +
                mysql.escape(newProperty.Details.bathrooms) + ',' +
                mysql.escape(newProperty.Photos.photos) + ',' +
                mysql.escape(new Date(newProperty.PricingDetails.availabilityStartDate)) + ',' +
                mysql.escape(new Date(newProperty.PricingDetails.availabilityEndDate)) + ',' +
                mysql.escape(newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate) + ',' +
                mysql.escape(newProperty.PricingDetails.minStay) + ',' +
                mysql.escape(userSession.ProfileId) + ',' +
                mysql.escape(userSession.Firstname + ' ' + userSession.Lastname) + ');';

            conn.query(sql, function (err, result) {

                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in Posting property data');
                }
                else {

                    console.log('Property listing complete!');
                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Property listing complete!');
                }

            });

        }

    });
});

//Search
app.post('/search', function (req, res) {

    console.log('Inside Search Method GET!');
    console.log('Request Body: ', req.body);

    const searchProperties = req.body;

    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');
        }
        else {

            //Search Properties Query            
            var sql = 'SELECT * from propertydetails WHERE ' +
                'City = ' + mysql.escape(searchProperties.searchText) +
                ' AND DATE(Availabilitystartdate) BETWEEN ' + mysql.escape(new Date(searchProperties.startDate).toISOString().substring(0, 10)) + ' AND \'2020-01-01\'' +
                ' AND DATE(Availabilityenddate) BETWEEN ' + mysql.escape(new Date(searchProperties.endDate).toISOString().substring(0, 10)) + ' AND \'2020-01-01\';';

            conn.query(sql, function (err, result) {

                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in Retrieving property data');

                }
                else {

                    res.writeHead(200, {
                        'Content-type': 'application/json'
                    });
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                }
            });
        }
    });

});

//Get Property Details

app.post('/property-details', function (req, res) {

    console.log('Inside Property Details Method GET!');
    console.log('Request Body: ', req.body);

    pool.getConnection(function (err, conn) {
        if (err) {

            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');

        }
        else {

            var sql = 'SELECT * from propertydetails WHERE PropertyId = ' + req.body.PropertyId;
            conn.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in Retrieving property');

                }
                else {
                    res.writeHead(200, {
                        'Content-type': 'application/json'
                    });
                    console.log(JSON.stringify(result[0]));
                    res.end(JSON.stringify(result[0]));
                }
            });
        }
    });

});

//submit Booking

app.post('/submit-booking', function (req, res) {

    console.log('Inside Submit Booking POST!');
    console.log('Request Body: ', req.body);
    const bookingDetails = req.body;

    if (req.session.user) {
        const userSession = req.session.user;

        pool.getConnection(function (err, conn) {
            if (err) {
                console.log('Error in creating connection!');
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in creating connection!');
            }
            else {
                var sql = 'insert into bookingdetails VALUES (NULL,' +
                    mysql.escape(bookingDetails.PropertyId) + ',' +
                    mysql.escape(userSession.ProfileId) + ',' +
                    mysql.escape(userSession.Firstname + ' ' + userSession.Lastname) + ',' +
                    mysql.escape(bookingDetails.Bookingstartdate) + ',' +
                    mysql.escape(bookingDetails.Bookingenddate) + ',' +
                    mysql.escape(bookingDetails.Guests) + ',' +
                    mysql.escape(bookingDetails.Totalcost) + ');';
                conn.query(sql, function (err, result) {

                    if (err) {
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Error in Booking  property');
                    }
                    else {
                        res.writeHead(200, {
                            'Content-type': 'text/plain'
                        });
                        console.log('Booking Successful!');
                        res.end('Booking Successful!');

                    }
                });
            }
        });
    }

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

//Trip - details

app.get('/trip-details', function (req, res) {

    console.log('Inside Trip Details GET!');
    const userSession = req.session.user;

    pool.getConnection(function (err, conn) {

        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');

        }
        else {
            var sql = 'SELECT * from bookingdetails where TravelerId = ' + mysql.escape(userSession.ProfileId);
            conn.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    console.log('Error in Getting Trip Details');
                    res.end('Error in Getting Trip Details');
                }
                else {

                    res.writeHead(200, {
                        'Content-type': 'application/json'
                    });
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                }
            });
        }
    });


});

//owner dashboard details

app.get('/owner-dashboard-details', function (req, res) {

    console.log('Inside Owner Dashboard Details GET!');
    const userSession = req.session.user;

    pool.getConnection(function (err, conn) {

        if (err) {
            console.log('Error in creating connection!');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in creating connection!');

        }
        else {
            var sql = 'SELECT * from bookingdetails where PropertyId in (SELECT PropertyId from propertydetails where OwnerId = ' + mysql.escape(userSession.ProfileId) + ')';
            conn.query(sql, function (err, result) {
                if (err) {
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    console.log('Error in Getting Dahsboard Details');
                    res.end('Error in Getting Dahsboard Details');
                }
                else {

                    res.writeHead(200, {
                        'Content-type': 'application/json'
                    });
                    console.log(JSON.stringify(result));
                    res.end(JSON.stringify(result));
                }
            });
        }
    });




});

app.listen(3001);