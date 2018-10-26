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

    Model.Userdetails.findOne({
        'Email': req.body.Email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in fetching user details!');
        }
        else {

            console.log("User details ", user);
            if (!bcrypt.compareSync(req.body.Password, user.Password)) {
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Invalid Credentials!');
                res.end('Invalid Credentials!');
            }
            else {
                res.cookie('cookie', user.FirstName, {
                    maxAge: 360000,
                    httpOnly: false,
                    path: '/'
                });
                res.cookie('Accounttype', user.Accounttype, {
                    maxAge: 360000,
                    httpOnly: false,
                    path: '/'
                });
                req.session.user = user;


                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Login successful!');
            }


        }

    });



});

//Signup
app.post('/signup', function (req, res) {

    console.log('Inside Signup POST');
    console.log('Request Body: ', req.body);

    //User creation query

    var userCount = 1;
    Model.Userdetails.countDocuments({}, function (err, count) {
        userCount += count;
    });

    //Check if user exists

    Model.Userdetails.findOne({
        'Email': req.body.Email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in fetching user details!');
        }
        else {

            if (user) {
                console.log('User Exists!', user);
                user.Accounttype = 3;
            }
            else {
                const hashedPassword = bcrypt.hashSync(req.body.Password);

                var user = new Model.Userdetails({
                    Username: req.body.Email,
                    Password: hashedPassword,
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    Email: req.body.Email,
                    Aboutme: '',
                    Country: '',
                    City: '',
                    Gender: '',
                    Hometown: '',
                    School: '',
                    Company: '',
                    Language: '',
                    PhoneNumber: '',
                    ProfileImage: 'default-profile-image.jpg',
                    Accounttype: req.body.Accounttype,
                    ProfileId: userCount
                });
            }

            user.save().then((doc) => {

                console.log("User saved successfully.", doc);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Adding a user successful!');

            }, (err) => {
                console.log("Unable to save user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in adding an user');
            });

        }

    });

    //Hashing Password!

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
        Model.Userdetails.findOne({
            'Email': req.session.user.Username
        }, (err, user) => {

            if (err) {
                console.log("Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in fetching user details!');
            }
            else {

                console.log('Profile Data: ', user);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(user));

            }
        });
    }
});

//Update Profile data

app.post('/update-profile', function (req, res) {

    console.log('Inside Update Profile POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        Model.Userdetails.findOne({
            'Email': req.session.user.Email
        }, (err, user) => {

            if (err) {
                console.log("Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in fetching user details!');
            }
            else {
                console.log('Userdetails', user);

                user.FirstName = req.body.FirstName;
                user.LastName = req.body.LastName;
                user.Email = req.body.Email;
                user.Aboutme = req.body.Aboutme;
                user.Country = req.body.Country;
                user.City = req.body.City;
                user.Gender = req.body.Gender;
                user.Hometown = req.body.Hometown;
                user.School = req.body.School;
                user.Company = req.body.Company;
                user.Language = req.body.Language;
                user.PhoneNumber = req.body.PhoneNumber;
                user.ProfileImage = req.body.ProfileImage;

                user.save().then((doc) => {

                    console.log("User details saved successfully.", doc);
                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Adding a user successful!');

                }, (err) => {
                    console.log("Unable to save user details.", err);
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in adding an user');
                });
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

        var propertyCount = 1;
        Model.PropertyDetails.countDocuments({}, function (err, count) {
            propertyCount += count;
        });
        console.log(propertyCount);
        const propertyId = mongooseTypes.ObjectId();


        Model.Userdetails.findOne({
            Email: userSession.Email
        }, function (err, user) {
            if (err) {
                console.log("Add-property. Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Add-property. Error in fetching user details!');
            }
            else {
                console.log('User', user);
                var propertyDetails = {
                    //PropertyId: propertyId.toString(),
                    Country: newProperty.LocationDetails.country,
                    StreetAddress: newProperty.LocationDetails.streetAddress,
                    UnitNumber: newProperty.LocationDetails.unitNumber,
                    City: newProperty.LocationDetails.city,
                    State: newProperty.LocationDetails.state,
                    ZipCode: newProperty.LocationDetails.zipCode,
                    Headline: newProperty.Details.headline,
                    Description: newProperty.Details.description,
                    PropertyType: newProperty.Details.propertyType,
                    Bedrooms: newProperty.Details.bedrooms,
                    Accomodates: newProperty.Details.accomodates,
                    Bathrooms: newProperty.Details.bathrooms,
                    Photos: newProperty.Photos.photos,
                    AvailabilityStartDate: new Date(newProperty.PricingDetails.availabilityStartDate),
                    AvailabilityEndDate: new Date(newProperty.PricingDetails.availabilityEndDate),
                    Currency: newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate,
                    Baserate: newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate,
                    MinStay: newProperty.PricingDetails.minStay
                };
                user.PropertyDetails = user.PropertyDetails || [];
                user.PropertyDetails.push(propertyDetails);

                /**Save property to user details */
                user.save().then((doc) => {

                    console.log("Property details saved successfully.", doc);


                }, (err) => {
                    console.log("Unable to property details.", err);
                    res.writeHead(400, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Error in adding a property');
                });

                /**Save property to user details */


            }
        });        

        /**Creating property object to add to Property details collection */
        var property = new Model.PropertyDetails({            
            PropertyId : propertyId,
            Country: newProperty.LocationDetails.country,
            StreetAddress: newProperty.LocationDetails.streetAddress,
            UnitNumber: newProperty.LocationDetails.unitNumber,
            City: newProperty.LocationDetails.city,
            State: newProperty.LocationDetails.state,
            ZipCode: newProperty.LocationDetails.zipCode,
            Headline: newProperty.Details.headline,
            Description: newProperty.Details.description,
            PropertyType: newProperty.Details.propertyType,
            Bedrooms: newProperty.Details.bedrooms,
            Accomodates: newProperty.Details.accomodates,
            Bathrooms: newProperty.Details.bathrooms,
            Photos: newProperty.Photos.photos,
            AvailabilityStartDate: new Date(newProperty.PricingDetails.availabilityStartDate),
            AvailabilityEndDate: new Date(newProperty.PricingDetails.availabilityEndDate),
            Currency: newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate,
            Baserate: newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate,
            MinStay: newProperty.PricingDetails.minStay,
            Ownername: userSession.FirstName + " " + userSession.LastName,
        });
        
        //console.log('PropertyCount', propertyCount);
        //property.PropertyId = propertyCount;
        

        property.save().then((doc) => {

            console.log("Property details saved successfully.", doc);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Adding a property successful!');

        }, (err) => {
            console.log("Unable to property details.", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in adding a property');
        });

        /**Creating property object to add to Property details collection */

    }
});

//Search
app.post('/search', function (req, res) {

    console.log('Inside Search Method GET!');
    console.log('Request Body: ', req.body);

    const searchProperties = req.body;

    //Property search based on availability
    var properties = [];
    Model.PropertyDetails.find({
        City: searchProperties.searchText,
        AvailabilityStartDate: {

            $lte: new Date(searchProperties.startDate)
        },
        AvailabilityEndDate: {
            $gte: new Date(searchProperties.endDate),

        }
    }, async (err, result) => {
        if (err) {
            console.log('Error in Retrieving property data');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Retrieving property data');
        }
        else {
            console.log('property list seacrh based on availability dates', JSON.stringify(result));

            properties = result;
            var propertyResult = [];
            for (let i = 0; i < properties.length; i++) {
                console.log('Insideproperties array: ', properties[i].PropertyId);


                await Model.BookingDetails.find({
                    PropertyId: properties[i].PropertyId
                }, (err, result) => {
                    if (err) {
                        console.log('Error in Retrieving property data');
                        res.writeHead(400, {
                            'Content-type': 'text/plain'
                        });
                        res.end('Error in Retrieving property data');
                    }
                    else {

                        if (result.length > 0) {

                            var bookingstartdate = new Date(result[0].Bookingstartdate);
                            var bookingenddate = new Date(result[0].Bookingenddate);
                            console.log(bookingstartdate + " " + bookingenddate);
                            console.log(new Date(searchProperties.startDate) + " " + new Date(searchProperties.endDate));                        
                            console.log('Check startDate: ', new Date(searchProperties.startDate) >= bookingstartdate && new Date(searchProperties.startDate) <= bookingenddate);            
                            console.log('Check endDate: ', new Date(searchProperties.endDate) >= bookingstartdate && new Date(searchProperties.endDate) <= bookingenddate);            
                            if ((new Date(searchProperties.startDate) >= bookingstartdate && new Date(searchProperties.startDate) <= bookingenddate) || (new Date(searchProperties.endDate) >= bookingstartdate && new Date(searchProperties.endDate) <= bookingenddate)) {
                                properties.splice(i, 1);
                            }
                        }
                    }
                });
            }


            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            console.log(JSON.stringify(properties));
            res.end(JSON.stringify(properties));
        }

        //console.log('property list seacrh based on availability dates', properties);







    });
});

//Get Property Details

app.post('/property-details', function (req, res) {

    console.log('Inside Property Details Method POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {

        var properties = Model.PropertyDetails.find({
            PropertyId: req.body.PropertyId
        }, (err, result) => {
            if (err) {
                console.log('Error in Retrieving property data');
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in Retrieving property data');
            }
            else {
                console.log(JSON.stringify(result));
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
            console.log('result', result);
        });
    }

});

//submit Booking

app.post('/submit-booking', async function (req, res) {

    console.log('Inside Submit Booking POST!');
    console.log('Request Body: ', req.body);

    if (req.session.user) {
        const userSession = req.session.user;

        var booking = new Model.BookingDetails({
            'PropertyId': req.body.PropertyId,
            'Bookingstartdate': req.body.Bookingstartdate,
            'Bookingenddate': req.body.Bookingenddate,
            'Guests': req.body.Guests,
            'TotalCost': req.body.TotalCost,
            'Ownername': req.body.Ownername,
            'Travelername': userSession.FirstName + " " + userSession.LastName,
            'TravelerId': userSession.ProfileId,
        });

        await booking.save().then((doc) => {
            console.log("Booking details saved successfully.", doc);
            // res.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });
            // res.end('Booking added successfully! ');
        },
            (err) => {
                console.log("Unable to save booking details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in adding a booking');
            });

        Model.Userdetails.findOne({
            Email : req.session.user.Email
        }, function(err, user){
            if(err){
                console.log("Unable to get user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in getting user');
            }
            else{

                var propertyDetails = req.body.PropertyDetails;
                propertyDetails.PropertyId = req.body.PropertyId;
                propertyDetails.Bookingstartdate = req.body.Bookingstartdate;
                propertyDetails.Bookingenddate = req.body.Bookingenddate;
                propertyDetails.Guests = req.body.Guests;
                propertyDetails.TotalCost = req.body.TotalCost;
                propertyDetails.Ownername = req.body.Ownername;
                propertyDetails.Travelername = userSession.FirstName + " " + userSession.LastName;
                propertyDetails.TravelerId = userSession.ProfileId;   

                user.Tripdetails = user.Tripdetails || [];
                user.Tripdetails.push(propertyDetails);
                user.save().then((doc)=>{
                    console.log('Booking details saved to user details', doc);
                    res.writeHead(200, {
                        'Content-type': 'text/plain'
                    });
                    res.end('Booking added successfully! ');
                }, (err)=>{
                    console.log("Unable to save booking details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in adding a booking');
                });
                
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

        // pool.getConnection(function (err, conn) {

        //     if (err) {
        //         console.log('Error in creating connection!');
        //         res.writeHead(400, {
        //             'Content-type': 'text/plain'
        //         });
        //         res.end('Error in creating connection!');

        //     }
        //     else {
        //         var sql = 'SELECT * from bookingdetails where TravelerId = ' + mysql.escape(userSession.ProfileId);
        //         conn.query(sql, function (err, result) {
        //             if (err) {
        //                 res.writeHead(400, {
        //                     'Content-type': 'text/plain'
        //                 });
        //                 console.log('Error in Getting Trip Details');
        //                 res.end('Error in Getting Trip Details');
        //             }
        //             else {

        //                 res.writeHead(200, {
        //                     'Content-type': 'application/json'
        //                 });
        //                 console.log(JSON.stringify(result));
        //                 res.end(JSON.stringify(result));
        //             }
        //         });
        //     }
        // });

        Model.Userdetails.findOne({
            Email : req.session.user.Email
        }, (err, user) => {
            if(err){
                console.log("Unable to get user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in getting user');
            }
            else{
                console.log('Trip details', JSON.stringify(user.Tripdetails));
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });                
                res.end(JSON.stringify(user.Tripdetails));
                
            }
        });

    }


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


//Mongo Sample



module.exports = app;
app.listen(3001);