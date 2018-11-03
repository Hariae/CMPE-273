//submit booking.js - Submit booking route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');
//Messaging feature

router.post('/', function(req, res){
    console.log('Inside Send Message POst!');
    console.log('Request body: ', req.body);

    kafka.make_request("send-message", req, function(err, result){
        if(err){
            console.log("Unable to send message.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in sending message');
        }
        else{
            //console.log('Message sent successfully', result);
                res.writeHead(200, {
                        'Content-type': 'text/plain'
                });
                res.end('Message sent successfully! ');
        }
    })
});

module.exports = router;