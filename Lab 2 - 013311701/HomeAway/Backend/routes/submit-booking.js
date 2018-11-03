//submit booking.js - Submit booking route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

router.post('/', requireAuth, function (req, res) {

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

module.exports = router;