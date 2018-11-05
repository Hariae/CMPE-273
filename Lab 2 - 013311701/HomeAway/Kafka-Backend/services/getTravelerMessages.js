var Model = require('../DatabaseConnection');

function handle_request(message, callback) {
    console.log('Inside Kafka Method Get Message. Message ', message);
       
    Model.MessageCollection.find({
        'TravelerId' : message.session.user.ProfileId        
    }, (err, result) => {
        if(err){
            console.log('Error in Retrieving message data', err);
            callback(err, null);
        }
        else{
            console.log('Message result', result);
            callback(null, result);
        }
    });
}

exports.handle_request = handle_request;