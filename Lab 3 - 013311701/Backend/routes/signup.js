var Model = require('../DatabaseConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;

async function handle_request(args, callback){
    console.log('Inside signip. Args: ', args);

    const profileId = mongooseTypes.ObjectId();

    //Check if user exists

    await Model.Userdetails.findOne({
        'Email': args.Email
    }, async (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);            
        }
        else {

            if (user) {
                console.log('User Exists!', user);
                if(args.Accounttype === user.Accounttype || user.Accounttype == 3){
                    console.log('Duplicate user');
                    //callback(null, null);
                    return null;
                }
                else{
                    user.Accounttype = 3;

             user.save().then(async (doc) => {

                console.log("User saved successfully.", doc);
                 callback(null, doc);

            }, (err) => {
                console.log("Unable to save user details.", err);
                callback(err, null);
            });

                }
                
            }
            else {

                //Hashing Password!
                //const hashedPassword = bcrypt.hashSync(args.Password);

                var user = new Model.Userdetails({
                    Username: args.Email,
                    Password: args.Password,
                    FirstName: args.FirstName,
                    LastName: args.LastName,
                    Email: args.Email,
                    // Aboutme: '',
                    // Country: '',
                    // City: '',
                    // Gender: '',
                    // Hometown: '',
                    // School: '',
                    // Company: '',
                    // Language: '',
                    // PhoneNumber: '',
                    // ProfileImage: 'default-profile-image.jpg',
                    Accounttype: args.Accounttype,
                    ProfileId: profileId
                });

            user.save().then((doc) => {

                console.log("User saved successfully.", doc);
                return doc;

            }, (err) => {
                console.log("Unable to save user details.", err);
                callback(err, null);
            });

            }

        }
    });
}

module.exports = handle_request;