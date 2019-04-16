/*
The parsing function is the only export. Ever
*/
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

var parse = function(req, res){
    var message = req.body.Body;
    message.split(" ");
    console.log(message.length);
    var commmand = message[0];
    var category = message[1];
    var dollarAmount = message[2];
}










module.exports.parse = parse;

