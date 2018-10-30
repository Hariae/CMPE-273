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
    },
    'PropertyDetails' : {
        type: Array
    },
    'Tripdetails' : Array,
    'ProfileId' : String
});


var PropertyDetails = mongoose.model('PropertyDetails', {    
    'PropertyId' : String,
    'Headline' : String,
    'Description' : String,
    'Country' : String,
    'StreetAddress' :String,
    'City' : String,
    'State' : String,
    'ZipCode' : String,
    'PropertyType' :String,
    'Bedrooms' : Number,
    'Accomodates' :Number,
    'Bathrooms': Number,
    'Photos' : String,
    'Currency' : String,
    'Baserate' : String,
    'AvailabilityStartDate': Date,
    'AvailabilityEndDate': Date,
    'MinStay' : Number,
    'Ownername' : String,
    'Messages': Array,
    'OwnerId' : String
});

var BookingDetails = mongoose.model('BookingDetails', {
    'PropertyId' : String,
    'Bookingstartdate' : Date,
    'Bookingenddate' : Date,
    'Guests': Number,
    'TotalCost' : String,
    'Ownername' : String,
    'Travelername' : String,
    'TravelerId' : Number
});

var MessageCollection = mongoose.model('MessageCollection',{
    'PropertyId' : String,
    'TravelerId' : String,
    'OwnerId' : String,
    'Message' : JSON,
    'MessageId': String
});

module.exports = {
    Userdetails,
    PropertyDetails,
    BookingDetails,
    MessageCollection
};
