//Login.js - Login route module
var express = require('express');
var router = express.Router();


//Kafka
var kafka = require('../kafka/client');


//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
const secret = "secret";

//Login validation
router.post('/', function (req, res) {

    console.log('Inside login POST');
    console.log('Request Body: ', req.body);

    //Kafka request 

    kafka.make_request('login', req.body, function(err, result){
        console.log('In results login');
        console.log('results', result);
        if(err){
            console.log('Inside err login');
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.end('Error in login!');
        }
        else{
            console.log('Inside results Login');
            if(result){
                req.session.user = result;

                // Create token if the password matched and no error was thrown
                var token = jwt.sign(result, secret, {
                    expiresIn: 10080 // in seconds
                });

                //res.json({success: true, token: 'JWT ' + token});
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                
                //res.status(200).json({success: true, Authorization: 'Bearer ' + token});
                var Result = {
                    FirstName : result.FirstName,
                    Accounttype : result.Accounttype,
                    Token : token
                }

                res.end(JSON.stringify(Result));    
            }
            else{
                res.writeHead(401,
                    {
                        'Content-type': 'text/plain'
                    })
                console.log('Invalid Credentials!');
                res.end('Invalid Credentials!');
            }            
        }
    });

    //Query    
});

module.exports = router;