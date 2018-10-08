var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//CORS
var cors = require('cors');

app.set('view engine', 'ejs');

//CORS to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


//Allow Access Control 
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Request-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());


app.post('/calculate', function(req, res){

    console.log('Inside Calculate method!');
    
    var result = eval(req.body.expression);
    res.writeHead(200,{
        'Content-type':'application/json'
    });
    console.log("Result:", JSON.stringify(result));
    res.end(JSON.stringify(result));

});

app.listen(3010);
