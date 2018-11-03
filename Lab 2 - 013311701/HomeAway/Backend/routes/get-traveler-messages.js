//submit booking.js - Submit booking route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');
//Get Traveler messages

router.post('/', function(req, res){
    console.log('Inside Get Traveler Message GET!');
    console.log('Request body: ', req.body);

    kafka.make_request("get-traveler-messages", req, function(err, result){
        if(err){
            console.log("Unable to get traveler message.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in get traveler message');
        }
        else{
                console.log('traveler Message retreived successfully ', result);
                res.writeHead(200, {
                        'Content-type': 'text/plain'
                });
                res.end(JSON.stringify(result));
        }
    });
});


module.exports = router;