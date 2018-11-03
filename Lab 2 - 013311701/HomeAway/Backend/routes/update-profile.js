//Login.js - Login route module
var express = require('express');
var router = express.Router();
//Passport authentication
var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});

//Kafka
var kafka = require('../kafka/client');


//Update Profile data

router.post('/', requireAuth, function (req, res) {

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

module.exports = router;