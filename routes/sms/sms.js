const express = require('express');
const router  = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const smsHandler = require('../../middleware/smsMiddleware/smsHandler');
// @ POST /sms
// @ Can only be hit by text messages via Twilio. 

router.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    //Grab the phone number from the POST request
    const phoneNumber = req.body.From;
    // Interpret the text message the user sent
    const input = req.body.Body;
    var body = input.split(" ");
    const command = body[0];
    const category = body[1];
    const amount = body[2];
  
    //Init the string to return, or text back
    let string = '';
    // We should check if the size of the input is too large before we do anything
    if (command === 'helpme'){
        string = smsHandler.helpme();
    }
  
    if(command === 'create'){
      smsHandler.createNewUser(phoneNumber, () => {
        console.log('reached create user call back');
        string = 'New User created!';
      });
    }
  
    if (command === 'log'){
      string = smsHandler.logItem(phoneNumber, category, amount);
      string = 'LOG BABY';
    }
  
    if (command === 'report'){
      string = report(phoneNumber, category, amount);
      string = 'REPORT';
    }
  
    if(command === 'set'){
      string = set(phoneNumber, category, amount);
      string = 'SET THE WORLD';
    }
  
    twiml.message(string);
    console.log(string);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

module.exports = router;