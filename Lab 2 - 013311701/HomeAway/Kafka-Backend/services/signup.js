var Model = require('../DatabaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;

function handle_request(message, callback){
    console.log('Inside Kafka Backend Signup');
    console.log('Message: ', message);


    //User creation query

    const profileId = mongooseTypes.ObjectId();

    //Check if user exists

    Model.Userdetails.findOne({
        'Email': message.Email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);            
        }
        else {

            if (user) {
                console.log('User Exists!', user);
                if(message.Accounttype === user.Accounttype){
                    console.log('Duplicate user');
                    callback(null, null);
                }
                else{
                    user.Accounttype = 3;
                }
                
            }
            else {

                //Hashing Password!
                const hashedPassword = bcrypt.hashSync(message.Password);

                var user = new Model.Userdetails({
                    Username: message.Email,
                    Password: hashedPassword,
                    FirstName: message.FirstName,
                    LastName: message.LastName,
                    Email: message.Email,
                    Aboutme: '',
                    Country: '',
                    City: '',
                    Gender: '',
                    Hometown: '',
                    School: '',
                    Company: '',
                    Language: '',
                    PhoneNumber: '',
                    ProfileImage: 'default-profile-image.jpg',
                    Accounttype: message.Accounttype,
                    ProfileId: profileId
                });
            }

            user.save().then((doc) => {

                console.log("User saved successfully.", doc);
                callback(null, doc);

            }, (err) => {
                console.log("Unable to save user details.", err);
                callback(err, null);
            });

        }

    });

}

exports.handle_request = handle_request;