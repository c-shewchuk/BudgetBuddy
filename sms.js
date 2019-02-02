const lib = require('lib');
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

/*
* Inititalize the express framework and create the server to recieve the 
*/
const app = express();

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  //Grab the phone number from the POST request
  var phoneNumber = req.body.From;
  //Init the string to return, or text back
  var string = '';
  // Interpret the text message the user sent
  var input = req.body.Body;
  var body = input.split(" ");
 
  var command = body[0];
  var category = body[1];
  var amount = body[2];

  // We should check if the size of the input is too large before we do anything
  if (command == 'helpme'){
      string = help();
  }
  if(command == 'create'){
    createAccount(phone);
    string = `Account created for ${phoneNumber}`;
  }
  if (command == 'log'){
    string = log(category, amount);
  }

  if (command == 'report'){
    string = report(category, amount);
  }

  if(command == 'set'){
    string = set(category, amount);
  }

  
  twiml.message(string);
  console.log(string);
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
* Functions to interact with the database and update the tables
*/


function addFood(){ 
  return null;
} 

function add_clothes(){

}

function add_entertainment(){

}


function help(){
  var string = 'Piggy Bank is a simple SMS app that allows you to easily track your budget, anywhere!!\n';
  string = string + 'To get started, text us the word create and we will get you setup!\n';
  string = string + 'To set your budget for each category, text set category amount. Available categories are food and clothes\n';
  string = string + 'To add money you have spent, text log category amount\n';
  string = string + 'To see a weekly report, text report weekly\n';
  string = string + 'To see a monthly report, text report monthly\n';
  string = string + 'As always, text helpme to get some help';
  return string;
}



