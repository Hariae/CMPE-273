// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/sample', (err, client) => {

//     if(err){
//         console.log('Error in connecting to Mongo DB', err);
//     }
//     else{
//         console.log('Connection Successful');
//         const db = client.db('sample');
//         db.collection('sampleCollection').insertOne({
//             UserId : '1',
//             Name : 'admin',
//             Password : 'password'
//         }, (err, result)=>{
//             if(err){
//                 console.log('Error Occured!');
//             }
//             else{
//                 console.log(JSON.stringify(result.ops, undefined, 2));
//             }
//         });
//         client.close();
//     }
    
// });

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/HomeAway');

var Userdetails = mongoose.model('Userdetails', {

    'Username' : {
        type: String
    },
    'Password' : {
        type: String
    },
    'FirstName' : {
        type: String
    },
    'LastName' : {
        type : String
    },
    'Email' : {
        type : String
    },
    'Aboutme' :  {
        type : String
    },
    'Country' : {
        type : String
    },
    'City' : { 
        type : String
    },
    'Gender' : {
        type : String
    },
    'Hometown' : {
        type : String
    },
    'School' : {
        type : String
    },
    'Company' : {
        type : String
    },
    'Language' : {
        type : String
    },
    'ProfileImage' : {
        type : String
    },
    'PhoneNumber' : {
        type : String
    },
    'Accounttype' : {
        type : Number
    }
});

module.exports = Userdetails;