//Profile-details.js - Profile details route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

router.get('/', requireAuth, function (req, res) {

    console.log('Inside Profile Details GET!');
    console.log('Request Body:', req.body);

    if (req.session.user) {
        console.log(req.session.user);

        kafka.make_request("profile-details", req, function(err, result){
            if(err){
                console.log("Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error in fetching user details!');
            }
            else{
                console.log('Profile Data: ', result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });        
    }
});

module.exports = router;