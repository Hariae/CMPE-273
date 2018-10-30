var Model = require('../DatabaseConnection');

async function handle_request(message, callback){
    
    console.log('Inside Kafka Method Submit  Booking. Message ', message);
    const userSession = message.session.user;

    var booking = new Model.BookingDetails({
        'PropertyId': message.body.PropertyId,
        'Bookingstartdate': message.body.Bookingstartdate,
        'Bookingenddate': message.body.Bookingenddate,
        'Guests': message.body.Guests,
        'TotalCost': message.body.TotalCost,
        'Ownername': message.body.Ownername,
        'Travelername': userSession.FirstName + " " + userSession.LastName,
        'TravelerId': userSession.ProfileId,
    });

    await booking.save().then((doc) => {
        console.log("Booking details saved successfully.", doc);        
    },
        (err) => {
            console.log("Unable to save booking details.", err);
            callback(err, null);
        });

    Model.Userdetails.findOne({
        Email: message.session.user.Email
    }, function (err, user) {
        if (err) {
            console.log("Unable to get user details.", err);
            callback(err, null);
        }
        else {

            var propertyDetails = message.body.PropertyDetails;
            propertyDetails.PropertyId = message.body.PropertyId;
            propertyDetails.Bookingstartdate = message.body.Bookingstartdate;
            propertyDetails.Bookingenddate = message.body.Bookingenddate;
            propertyDetails.Guests = message.body.Guests;
            propertyDetails.TotalCost = message.body.TotalCost;
            propertyDetails.Ownername = message.body.Ownername;
            propertyDetails.Travelername = userSession.FirstName + " " + userSession.LastName;
            propertyDetails.TravelerId = userSession.ProfileId;

            user.Tripdetails = user.Tripdetails || [];
            user.Tripdetails.push(propertyDetails);
            user.save().then((doc) => {
                console.log('Booking details saved to user details', doc);
                callback(null, doc);
            }, (err) => {
                console.log("Unable to save booking details.", err);
                callback(err, null);
            });

        }
    });
}

exports.handle_request = handle_request;