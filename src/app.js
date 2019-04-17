const express =  require('express');
const bodyParser = require('body-parser');
const http = require('http');


const app = express();
const smsController = require('./sms-controller');


// Set up parsing configurations 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});

//Set up server to listen for POST requests

app.post('/sms', (req, res) => {
    smsController.parse(req, res);
});
