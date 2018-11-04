var Model = require('../DatabaseConnection');
var bcrypt = require('bcrypt-nodejs');


function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');
    console.log('Message', msg);

    Model.Userdetails.findOne({
        'Email': msg.Email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else {

            if(user){
                console.log("User details ", user);
                if (!bcrypt.compareSync(msg.Password, user.Password)) {                
                    console.log('Invalid Credentials!');
                    callback(null, null);                
                }
                else {
                
                    callback(null, user);
                }
            }
            else{
                callback(null, null);
            }
            

        }

    });
}

exports.handle_request = handle_request;