var Model = require('../DatabaseConnection');

function handle_request(message, callback) {
    console.log('Inside Kafka Method Get Message. Message ', message);
    
    // Model.PropertyDetails.find({
    //     'Ownername': "Arivoli AE"
    // }, (err, result) => {
    //     if (err) {
    //         console.log('Error in Retrieving property data', err);
    //         callback(err, null);
    //     }
    //     else {
    //         console.log('Messages Data ', result);
            
    //         var messageResult = [];
    //         for(var i=0;i<result.length;i++){
    //             if(result[i].Messages.length > 0){
    //                 var resultSet = {
    //                     messages : result[i].Messages,
    //                     propertyId : result[i].PropertyId
    //                 }
                    
    //                 messageResult.push(resultSet);
    //             }
    //         }

            
    //         console.log(messageResult);
    //         callback(null, messageResult);
    //     }        
    // });

    Model.MessageCollection.find({
        'OwnerId' : message.session.user.ProfileId
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