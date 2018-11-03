//Logout.js - Logout route module
var express = require('express');
var router = express.Router();


//Logout
router.post('/', function (req, res) {
    console.log('POST LOgout!');
    res.clearCookie('cookie');
    req.session.user = undefined;
    res.writeHead(200, {
        'Content-type': 'text/plain'
    });
    res.end('Back to login!');

});

module.exports = router;