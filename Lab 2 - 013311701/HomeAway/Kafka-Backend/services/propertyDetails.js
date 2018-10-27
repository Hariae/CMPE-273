var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method Property Details. Message ', message);

    Model.PropertyDetails.find({
        PropertyId: message.body.PropertyId
    }, (err, result) => {
        if (err) {
            console.log('Error in Retrieving property data', err);
            callback(err, null);
        }
        else {
            console.log('Property Data ', JSON.stringify(result));
            callback(null, result);
        }        
    });
}

exports.handle_request = handle_request;