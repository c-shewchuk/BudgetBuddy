/*
The parsing function is the only export. Everything else will be handled here, at least for the SMS portion.
*/
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const db = require('./db');
db.connection.connect();

var parse = function(req, res){
    var message = req.body.Body;
    message = message.split(" ");

    var command = message[0];
    var category = message[1];
    var dollarAmount = message[2];
    
    if (command == 'helpme'){
        string = help();
    }
  
    if(command == 'create'){
        createAccount(req, message);
    }
  
    if (command == 'log'){
        log(req, category, dollarAmount);
    }
  
    if (command == 'report'){
        report(req);
    }
  
    if (command == 'set'){
        set(req, category, dollarAmount);
    }
}

var help  = function() {

}

// For an account creation, the message is different, but we need it. They must provide first and last name.
var createAccount = function(req, message){
    var phoneNumber = req.body.From;
    db.connection.query(`INSERT INTO users(phone_number, first_name, last_name) VALUES ('${phoneNumber}', '${message[1]}', '${message[2]}')`, (err) => {
        if (err)
            throw err;
        else
            console.log(`Insertion completed for ${phoneNumber}`);
    });
    return "Account created";
}

var log = function(req, category, dollarAmount){

}

/*
Maintain and set the budget values
*/
var set = function(req, category, dollarAmount){

}

var report = function(req){

}






module.exports.parse = parse;

