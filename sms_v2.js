const lib = require('lib');
const sms = lib.utils.sms['@1.0.9'];
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  var phone = req.body.From;
  console.log(phone);
  if(req.body.Body == 'create'){
    createAccount(phone);
    twiml.message('Account created!!');
  }

    twiml.message('Default message. Happy hacking!!');


  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

function createAccount(phone_number = 25){
  console.log(`Account created for ${phone_number}`);
}

/*
* Functions to interact with the database and 
*/


function add_to_db(){ return null;}



