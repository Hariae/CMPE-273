//search.js - Search route module
var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
//Kafka
var kafka = require('../kafka/client');

//Search
router.post('/', requireAuth, function (req, res) {

    console.log('Inside Search Method GET!');
    console.log('Request Body: ', req.body);

    kafka.make_request("search", req, function(err, result){
        if(err){
            console.log('Error in Property search');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in Property search');
        }
        else{
            
            res.writeHead(200, {
                'Content-type': 'application/json'
            });
            console.log(JSON.stringify(result));
            res.end(JSON.stringify(result));
        }
    });
});

module.exports = router;