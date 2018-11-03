//Add-property.js - Add Property details route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

//Post-Property
router.post('/', requireAuth, function (req, res) {

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

module.exports = router;