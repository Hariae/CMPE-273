var Model = require('../DatabaseConnection');
var mongooseTypes = require('mongoose').Types;

function handle_request(message, callback){
    console.log('Inside Kafka Method Add property. Message ', message);

    const propertyId = mongooseTypes.ObjectId();
    const newProperty = message.body;
    const userSession = message.session.user;


        Model.Userdetails.findOne({
            Email: userSession.Email
        }, function (err, user) {
            if (err) {
                console.log("Add-property. Unable to fetch user details.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Add-property. Error in fetching user details!');
            }
            else {
                console.log('User', user);
                var propertyDetails = {
                    //PropertyId: propertyId.toString(),
                    Country: newProperty.LocationDetails.country,
                    StreetAddress: newProperty.LocationDetails.streetAddress,
                    UnitNumber: newProperty.LocationDetails.unitNumber,
                    City: newProperty.LocationDetails.city,
                    State: newProperty.LocationDetails.state,
                    ZipCode: newProperty.LocationDetails.zipCode,
                    Headline: newProperty.Details.headline,
                    Description: newProperty.Details.description,
                    PropertyType: newProperty.Details.propertyType,
                    Bedrooms: newProperty.Details.bedrooms,
                    Accomodates: newProperty.Details.accomodates,
                    Bathrooms: newProperty.Details.bathrooms,
                    Photos: newProperty.Photos.photos,
                    AvailabilityStartDate: new Date(newProperty.PricingDetails.availabilityStartDate),
                    AvailabilityEndDate: new Date(newProperty.PricingDetails.availabilityEndDate),
                    Currency: newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate,
                    Baserate: newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate,
                    MinStay: newProperty.PricingDetails.minStay
                };
                user.PropertyDetails = user.PropertyDetails || [];
                user.PropertyDetails.push(propertyDetails);

                /**Save property to user details */
                user.save().then((doc) => {

                    console.log("Property details saved successfully.", doc);


                }, (err) => {
                    console.log("Unable to property details.", err);
                    callback(err, null);
                });

                /**Save property to user details */


            }
        });

        /**Creating property object to add to Property details collection */
        var property = new Model.PropertyDetails({
            PropertyId: propertyId,
            Country: newProperty.LocationDetails.country,
            StreetAddress: newProperty.LocationDetails.streetAddress,
            UnitNumber: newProperty.LocationDetails.unitNumber,
            City: newProperty.LocationDetails.city,
            State: newProperty.LocationDetails.state,
            ZipCode: newProperty.LocationDetails.zipCode,
            Headline: newProperty.Details.headline,
            Description: newProperty.Details.description,
            PropertyType: newProperty.Details.propertyType,
            Bedrooms: newProperty.Details.bedrooms,
            Accomodates: newProperty.Details.accomodates,
            Bathrooms: newProperty.Details.bathrooms,
            Photos: newProperty.Photos.photos,
            AvailabilityStartDate: new Date(newProperty.PricingDetails.availabilityStartDate),
            AvailabilityEndDate: new Date(newProperty.PricingDetails.availabilityEndDate),
            Currency: newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate,
            Baserate: newProperty.PricingDetails.currency + newProperty.PricingDetails.baserate,
            MinStay: newProperty.PricingDetails.minStay,
            Ownername: userSession.FirstName + " " + userSession.LastName,
            OwnerId: userSession.ProfileId
        });

      


        property.save().then((doc) => {

            console.log("Property details saved successfully.", doc);
            callback(null, doc);

        }, (err) => {
            console.log("Unable to property details.", err);
            callback(err, null);
        });

        /**Creating property object to add to Property details collection */

}

exports.handle_request = handle_request;