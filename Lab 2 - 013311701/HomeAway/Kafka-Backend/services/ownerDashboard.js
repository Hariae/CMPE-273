var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method owner dashboard. Message ', message);
    
    Model.Userdetails.findOne({
        Email: message.session.user.Email
    }, (err, user) => {
        if (err) {
            console.log("Unable to get user details.", err);
            callback(err, null);
        }
        else {
            console.log('Property details of owner', JSON.stringify(user.PropertyDetails));
            callback(null, user.PropertyDetails);
        }
    });
}

exports.handle_request = handle_request;