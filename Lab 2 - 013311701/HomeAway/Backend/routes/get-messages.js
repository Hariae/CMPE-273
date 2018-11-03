//Get messages.js - Get Message route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

router.post('/', function(req, res){
    console.log('Inside Get Message GET!');
    console.log('Request body: ', req.body);

    kafka.make_request("get-messages", req, function(err, result){
        if(err){
            console.log("Unable to get message.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in get message');
        }
        else{
                console.log('Message retreived successfully ', result);
                res.writeHead(200, {
                        'Content-type': 'text/plain'
                });
                res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;