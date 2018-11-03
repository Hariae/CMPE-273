var Model = require('../DatabaseConnection');
var mongooseTypes = require('mongoose').Types;

function handle_request(message, callback) {
    //console.log('Inside Kafka Method Send Message. Message ', message);
    console.log('Inside Kafka Method Send Message. Message ', message.body);
    if (message.body.traveler === true) {
        var messageData = {
            traveler: message.body.messageContent
        }

        var message = new Model.MessageCollection({
            PropertyId: message.body.PropertyId,
            TravelerId: message.session.user.ProfileId,
            OwnerId: message.body.OwnerId,
            Message: messageData,
            MessageId :  mongooseTypes.ObjectId()
        });

        message.save().then((doc) => {

            console.log("Message saved successfully.", doc);
            callback(null, doc);

        }, (err) => {
            console.log("Unable to message.", err);
            callback(err, null);
        });

    }
    else {
        
        Model.MessageCollection.findOne({
          'MessageId' : message.body.messageId
        }, (err, result)=>{
            if(err){
                console.log('Error in Retrieving message data', err);
                callback(err, null);
            }
            else{
                console.log('Owner send messager result: ', result);
                var messageFromDb = result.Message;
                console.log('message', messageFromDb);
                var newMessage = {
                    traveler: messageFromDb.traveler,
                    owner: message.body.messageContent
                }



                result.Message = newMessage;
                console.log('Owner send messager new result: ', result);
                result.save().then(doc=>{
                    console.log("Message saved successfully.", doc);
                    callback(null, doc);
                }, (err)=>{
                    console.log("Unable to message.", err);
                    callback(err, null);
                });
            }
        });
    }




}

exports.handle_request = handle_request;