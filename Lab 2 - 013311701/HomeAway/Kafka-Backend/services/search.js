var Model = require('../DatabaseConnection');

function handle_request(message, callback){
    console.log('Inside Kafka Method Search property. Message ', message);

    const searchProperties = message.body;

    //Property search based on availability
    var properties = [];
    Model.PropertyDetails.find({
        City: searchProperties.searchText,
        AvailabilityStartDate: {

            $lte: new Date(searchProperties.startDate)
        },
        AvailabilityEndDate: {
            $gte: new Date(searchProperties.endDate),

        }
    }, async (err, result) => {
        if (err) {
            console.log('Error in Retrieving property data', err);
            callback(err, null);
        }
        else {
            console.log('property list seacrh based on availability dates', JSON.stringify(result));

            properties = result;
            var propertyResult = [];
            for (let i = 0; i < properties.length; i++) {
                console.log('Insideproperties array: ', properties[i].PropertyId);


                await Model.BookingDetails.find({
                    PropertyId: properties[i].PropertyId
                }, (err, result) => {
                    if (err) {
                        console.log('Error in Retrieving property data', err);
                        callback(err, null);
                    }
                    else {

                        if (result.length > 0) {

                            var bookingstartdate = new Date(result[0].Bookingstartdate);
                            var bookingenddate = new Date(result[0].Bookingenddate);
                            console.log(bookingstartdate + " " + bookingenddate);
                            console.log(new Date(searchProperties.startDate) + " " + new Date(searchProperties.endDate));
                            console.log('Check startDate: ', new Date(searchProperties.startDate) >= bookingstartdate && new Date(searchProperties.startDate) <= bookingenddate);
                            console.log('Check endDate: ', new Date(searchProperties.endDate) >= bookingstartdate && new Date(searchProperties.endDate) <= bookingenddate);
                            if ((new Date(searchProperties.startDate) >= bookingstartdate && new Date(searchProperties.startDate) <= bookingenddate) || (new Date(searchProperties.endDate) >= bookingstartdate && new Date(searchProperties.endDate) <= bookingenddate)) {
                                properties.splice(i, 1);
                            }
                        }
                    }
                });
            }
            
            console.log(JSON.stringify(properties));
            callback(null, properties);
        }
    });
}

exports.handle_request = handle_request;