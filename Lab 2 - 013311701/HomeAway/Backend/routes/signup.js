//Signup.js - Signup route module
var express = require('express');
var router = express.Router();

//Kafka
var kafka = require('../kafka/client');

//Signup
router.post('/', function (req, res) {

    console.log('Inside Signup POST');
    console.log('Request Body: ', req.body);

    kafka.make_request('signup', req.body, function(err, result){
        console.log('In results Signup');
        console.log('Results: ', result);
        if(res){
            console.log("User saved successfully.", result);
            res.writeHead(200, {
                'Content-type': 'text/plain'
            });
            res.end('Adding a user successful!');
        }
        else{
            console.log("Unable to fetch user details. Error in Signup.", err);
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in fetching user details!');            
        }
    });
});

module.exports = router;