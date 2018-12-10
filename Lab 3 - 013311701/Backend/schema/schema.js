const graphql = require('graphql');
//const _ = require('lodash');
var Model = require('../DatabaseConnection');
var bcrypt = require('bcrypt-nodejs');
var signup = require('../routes/signup');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLDate
} = graphql;



const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
        Username: {
            type: GraphQLString
        },
        Password: {
            type: GraphQLString
        },
        FirstName: {
            type: GraphQLString
        },
        LastName: {
            type: GraphQLString
        },
        Email: {
            type: GraphQLString
        },
        Aboutme: {
            type: GraphQLString
        },
        Country: {
            type: GraphQLString
        },
        City: {
            type: GraphQLString
        },
        Gender: {
            type: GraphQLString
        },
        Hometown: {
            type: GraphQLString
        },
        School: {
            type: GraphQLString
        },
        Company: {
            type: GraphQLString
        },
        Language: {
            type: GraphQLString
        },
        PhoneNumber: {
            type: GraphQLString
        },
        Accounttype: {
            type: GraphQLString
        }
    })
});

const Property = new GraphQLObjectType({
    name : 'Property',
    fields : ()=>({
        PropertyId : {type: GraphQLString},
    Headline : {type: GraphQLString},
    Description : {type: GraphQLString},
    Country : {type: GraphQLString},
    StreetAddress :{type: GraphQLString},
    City : {type: GraphQLString},
    State : {type: GraphQLString},
    ZipCode : {type: GraphQLString},
    PropertyType :{type: GraphQLString},
    Bedrooms : {type:GraphQLInt},
    Accomodates :{type:GraphQLInt},
    Bathrooms: {type:GraphQLInt},
    Photos : {type: GraphQLString},
    Currency : {type: GraphQLString},
    Baserate : {type: GraphQLString},
    AvailabilityStartDate:{type: GraphQLString} ,
    AvailabilityEndDate: {type: GraphQLString},
    MinStay : {type:GraphQLInt},
    Ownername : {type: GraphQLString},
    OwnerId : {type: GraphQLString}
    
})
});

const loginResult = new GraphQLObjectType({
    name: 'loginResult',
    fields: () => ({
        result: { type: GraphQLBoolean },
        userData: { type: ProfileType }
    })
});

const signupResult = new GraphQLObjectType({
    name: 'signupResult',
    fields: () => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

const searchResult = new GraphQLObjectType({
    name: 'searchResult',
    fields: ()=>({
        properties : {type: new GraphQLList(Property)}
    })
});

const bookPropertyResult = new GraphQLObjectType({
    name : 'bookPropertyResult',
    fields: ()=>({
        success : {type: GraphQLBoolean}
    })
});

const tripDetails = new GraphQLObjectType({
    name: 'tripDetailResult',
    fields: ()=>({
        PropertyId: {type: GraphQLString},
        Bookingstartdate: {type: GraphQLString},
        Bookingenddate: {type: GraphQLString},
        TotalCost: {type: GraphQLString},
        Ownername: {type: GraphQLString},
        Travelername:{type: GraphQLString},
        Headline: {type: GraphQLString},
        PropertyType: {type: GraphQLString},
        PropertyBedrooms: {type: GraphQLInt},
        PropertyBathrooms:{type: GraphQLInt},
        PropertyAccomodates: {type: GraphQLInt}
    })
});

const tripDetailsResult = new GraphQLObjectType({
    name: 'tripDetailsResult',
    fields: ()=>({
        trips : {type: new GraphQLList(tripDetails)}
    })
})

const postedProperty = new GraphQLObjectType({
    name:'postedProperty',
    fields: ()=>({
        PropertyId :{type: GraphQLString},
        AvailabilityStartDate:{type: GraphQLString},
        AvailabilityEndDate:{type: GraphQLString},
        Baserate:{type: GraphQLString},
        Headline:{type: GraphQLString},
        PropertyType:{type: GraphQLString}
    })
});

const postedPropertyDetails = new GraphQLObjectType({
    name:'postedPropertyDetails',
    fields:()=>({
        postedProperties: {type: new GraphQLList(postedProperty)}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        login: {
            type: loginResult,
            args: {
                Username: {
                    type: GraphQLString
                },
                Password: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {

                console.log('args: ', args);
                var isAuthenticated = false;
                var profileData = {};

                await Model.Userdetails.findOne({
                    "Username": args.Username
                }, (err, user) => {
                    if (err) {
                        isAuthenticated = false;
                    }
                    else {
                        console.log('result', user.Username);
                        if (!bcrypt.compareSync(args.Password, user.Password)) {
                            console.log('Invalid Credentials!');
                            //callback(null, null);                
                            isAuthenticated = false;
                        }
                        else {
                            console.log('Corect creds!')
                            isAuthenticated = true;

                            profileData = user

                        }
                    }
                });

                console.log('isauth', isAuthenticated);
                console.log('Profile Data', profileData);
                if (isAuthenticated == true) {
                    var result = {
                        result: true,
                        userData: profileData
                    }
                    console.log('UserData', result.userData);
                }
                else {
                    var result = {
                        result: false
                    }
                }
                return result
            }
        },
        profile:{
            type: ProfileType,
            args: {
                Email : {
                    type: GraphQLString
                }
            },
            async resolve(parent, args){
                console.log('args: ', args);
                var profileData = {};
                await Model.Userdetails.findOne({
                    "Email" : args.Email
                }, (err, user)=>{
                    if(err){

                    }
                    else{
                        console.log('User details: ', user);
                        profileData = user;
                    }
                });

                return profileData;
            }
        },
        search:{
            type: searchResult,
            args: {
                searchText : {type: GraphQLString},
                startDate : {type: GraphQLString},
                endDate: {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log(args);

                var propertyData = [];
                await Model.PropertyDetails.find({
                    "City" : args.searchText
                }, (err, result)=>{
                    if(err){

                    }
                    else{
                        console.log('props list ', result);
                        propertyData = result.concat();
                        console.log('propserties', propertyData);
                    }
                    
                });

                var resultData = {
                    properties : propertyData
                }

                return resultData;

            }
        },
        property:{
           type: Property,
           args : {
               propertyId : {type: GraphQLString}
           },
           async resolve(parent, args){
               console.log(args);
               var propertyResult = {};
               await Model.PropertyDetails.find({
                   "PropertyId" : args.propertyId
               }, (err, result)=>{
                    if(err){

                    }
                    else{
                        console.log('Result ', result);
                        propertyResult = result[0];
                    }
               });
               return propertyResult;
           }
        },
        tripDetails:{
            type: tripDetailsResult,
            args:{
                Email:{type: GraphQLString}
            },
            async resolve(parent, args){
                console.log(args);
                var tripDetails = [];
                await Model.Userdetails.findOne({
                    "Email" : args.Email
                }, (err, result)=>{
                    if(err){

                    }
                    else{
                        console.log('result', result);
                        tripDetails = result.Tripdetails.concat();
                    }
                });

                var tripsResult = {
                    trips : tripDetails
                }

                return tripsResult;

            }


        },
        postedProperties: {
            type: postedPropertyDetails,
            args:{
                Email: {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log(args);
                var postedProperties = [];
                await Model.Userdetails.findOne({
                    "Email" : args.Email
                }, (err, result)=>{
                    if(err){

                    }
                    else{
                        console.log('result', result);
                        postedProperties = result.PropertyDetails.concat();
                    }
                });
                var postedPropertyDetails = {
                    postedProperties : postedProperties
                }
                return postedPropertyDetails;
            }

            
        }
    })
});



const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signup: {
            type: signupResult,
            args: {
                FirstName: {
                    type: GraphQLString
                },
                LastName: {
                    type: GraphQLString
                },
                Email: {
                    type: GraphQLString
                },
                Password: {
                    type: GraphQLString
                },
                Accounttype: {
                    type: GraphQLInt
                }
            },

            resolve: (parent, args) => {
                return new Promise(async (resolve, reject) => {
                    var successResult = false;
                var duplicateUserResult = false;
                    await Model.Userdetails.findOne({
                        "Email": args.Email
                    }, (err, user) => {
                        if (err) {

                        }
                        else {
                            if (user) {
                                console.log('User Exists!', user);
                                if (args.Accounttype === user.Accounttype || user.Accounttype == 3) {
                                    console.log('Duplicate user');
                                    duplicateUserResult = true;
                                    
                                    var resultData = {
                                        success: successResult,
                                        duplicateUser: duplicateUserResult
                                    }
                                    resolve(resultData);

                                }
                                else {
                                    user.Accounttype = 3;

                                    user.save().then(async (doc) => {

                                        console.log("User saved successfully.", doc);
                                        //callback(null, doc);
                                        successResult = true;

                                        var resultData = {
                                            success: successResult,
                                            duplicateUser: duplicateUserResult
                                        }
                                        resolve(resultData);

                                    });

                                }

                            }
                            else {
                                var user = new Model.Userdetails({
                                    Username: args.Email,
                                    Password: args.Password,
                                    FirstName: args.FirstName,
                                    LastName: args.LastName,
                                    Email: args.Email,
                                    Accounttype: args.Accounttype,
                                });
                                console.log('Use saving..');
                                user.save().then((doc) => {
                                    console.log("User saved successfully.", doc);
                                    successResult = true;
                                    console.log('EOF');
                                    var resultData = {
                                        success: successResult,
                                        duplicateUser: duplicateUserResult
                                    }
                                resolve(resultData);
                                });

                            }
                            
                        }
                    });
                });
            }
        },
        bookProperty: {
            type: bookPropertyResult,
            args: {
                PropertyId: {type: GraphQLString},
                Ownername: {type: GraphQLString},
                Headline : {type: GraphQLString},
                PropertyType:{type: GraphQLString},
                PropertyBedrooms:{type: GraphQLInt},
                PropertyBathrooms:{type: GraphQLInt},
                PropertyAccomodates:{type: GraphQLInt},
                PropertyBookingStartDate:{type: GraphQLString},
                PropertyBookingEndDate:{type: GraphQLString},
                PropertyTotalCost:{type: GraphQLString},
                Email: {type: GraphQLString},
                FirstName: {type: GraphQLString}
            },
            resolve: (parent, args) => {
                console.log(args);
                //var success = true;
                Model.Userdetails.findOne({
                    Email: args.Email
                }, function (err, user) {
                    if (err) {
                        console.log("Unable to get user details.", err);
                        //callback(err, null);
                    }
                    else {
            
                        var propertyDetails = {};
                        propertyDetails.PropertyId = args.PropertyId;
                        propertyDetails.Bookingstartdate = args.PropertyBookingStartDate;
                        propertyDetails.Bookingenddate = args.PropertyBookingEndDate;
                        //propertyDetails.Guests = message.body.Guests;
                        propertyDetails.TotalCost = args.PropertyTotalCost;
                        propertyDetails.Ownername = args.Ownername;
                        propertyDetails.Travelername = args.FirstName;
                        //propertyDetails.TravelerId = userSession.ProfileId;
                        propertyDetails.Headline = args.Headline;
                        propertyDetails.PropertyType = args.PropertyType;
                        propertyDetails.PropertyBedrooms = args.PropertyBedrooms;
                        propertyDetails.PropertyBathrooms = args.PropertyBathrooms;
                        propertyDetails.PropertyAccomodates = args.PropertyAccomodates;

            
                        user.Tripdetails = user.Tripdetails || [];
                        user.Tripdetails.push(propertyDetails);
                        user.save().then((doc) => {
                            console.log('Booking details saved to user details', doc);
                            //callback(null, doc);

                        }, (err) => {
                            console.log("Unable to save booking details.", err);
                            //callback(err, null);
                        });
            
                    }
                });

                var bookingResult = {
                    success : true
                }

                return bookingResult;

            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});