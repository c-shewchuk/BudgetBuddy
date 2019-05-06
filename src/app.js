const express =  require('express');
const bodyParser = require('body-parser');
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
const smsController = require('./sms-controller');


// Set up parsing configurations 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});

//Set up server to listen for POST requests and allow response for text messages

app.post('/sms', (req, res) => {
    var stringMessage = smsController.parse(req, res);
    var twiml = new MessagingResponse();
    twiml.message(stringMessage);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});
