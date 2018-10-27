var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method profile-details. Message ', message);
    Model.Userdetails.findOne({
            'Email': message.session.user.Username
        }, (err, user) => {

            if (err) {
                console.log("Unable to fetch user details.", err);
                callback(err, null);
            }
            else {

                console.log('Profile Data: ', user);
                callback(null, user);
            }
        });
}

exports.handle_request = handle_request;