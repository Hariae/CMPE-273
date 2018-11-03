//submit booking.js - Submit booking route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');


//owner dashboard details

router.get('/', requireAuth, function (req, res) {

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

module.exports = router;