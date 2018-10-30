var connection = require('./kafka/Connection');

var Login = require('./services/login');
var Signup = require('./services/signup');
var ProfileDetails = require('./services/profileDetails');
var UpdateProfile = require('./services/updateProfile');
var TripDetails = require('./services/tripDetails');
var OwnerDashboard = require('./services/ownerDashboard');
var AddProperty = require('./services/addProperty');
var Search = require('./services/search');
var PropertyDetails = require('./services/propertyDetails');
var SubmitBooking = require('./services/submitBooking');
var SendMessage = require('./services/sendMessage');
var GetMessages = require('./services/getMessages');
var GetTravelerMessages = require('./services/getTravelerMessages');

function handleTopicRequest(topic_name, function_name){

    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();

    console.log('server is running');
    consumer.on('message', function(message){
        console.log('message recieved for ' + topic_name + " " + function_name);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        function_name.handle_request(data.data, function(err, res){
            console.log('After request handling: ', res);
            var payload = [{
                topic: data.replyTo,
                messages: JSON.stringify({
                    correlationId : data.correlationId,
                    data : res
                }),
                partition: 0
            }];

            producer.send(payload, function(err, data){
                console.log('Data: ', data);
            });
            return;

        });
    });
}

handleTopicRequest("login", Login);
handleTopicRequest("signup", Signup);
handleTopicRequest("profile-details", ProfileDetails);
handleTopicRequest("update-profile", UpdateProfile);
handleTopicRequest("trip-details", TripDetails);
handleTopicRequest("owner-dashboard", OwnerDashboard);
handleTopicRequest("add-property", AddProperty);
handleTopicRequest("search", Search);
handleTopicRequest("property-details", PropertyDetails);
handleTopicRequest("submit-booking", SubmitBooking);
handleTopicRequest("send-message", SendMessage);
handleTopicRequest("get-messages", GetMessages);
handleTopicRequest("get-traveler-messages", GetTravelerMessages);