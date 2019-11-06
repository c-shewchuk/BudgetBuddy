const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

// INIT THE MONGOOSE DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connnected to Mongoose DB"); 
});

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
    createAccount(phoneNumber);
  }

  if (command == 'log'){
    string = log(phoneNumber, category, amount);
    string = 'LOG BABY';
  }

  if (command == 'report'){
    string = report(phoneNumber, category, amount);
    string = 'REPORT';
  }

  if(command == 'set'){
    string = set(phoneNumber, category, amount);
    string = 'SET THE WORLD';
  }

  
  twiml.message(string);
  console.log(string);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});


function createAccount(phoneNumber = 25){
  createUser(phoneNumber);
  console.log(`Account created for ${phoneNumber}`);
}

function set(phoneNumber, category, amount){
  if (category == 'food'){
    updateUserFoodBudget(phoneNumber, amount);
  }
  if (category == 'entertainment'){
    updateUserEntertainBudget(phoneNumber, amount);
  }

  if (category == 'clothing'){
    updateUserClothingBudget(phoneNumber, amount);
  }
  if (category == 'other'){
    updateUserOtherBudget(phoneNumber, amount);
  }
}

function report(phoneNumber, category, amount){
  user = lookupUser(phoneNumber);

}

async function log(phoneNumber, category, amount){
  var newVal = 0;
  if (category == 'food'){
    lookupFoodExpenditure(phoneNumber).then(function(result){
    updateUserFoodExpend(phoneNumber, result + newVal); 
    })
    .catch(function(error){
      throw error;
    });
    console.log(oldVal);
    console.log(amount);
    newVal = oldVal + amount;
    updateUserFoodExpend(phoneNumber, newVal);
    console.log(newVal);
    
  }

  if (category == 'entertainment'){
    oldVal = lookupEntertainExpenditure(phoneNumber);
    updateUserEntertainExpend(phoneNumber, amount + oldVal);
  }

  if (category == 'clothing'){
    oldVal = lookupClothingExpenditure(phoneNumber);
    updateUserClothingExpend(phoneNumber, oldVal + amount);
  }
  if (category == 'other'){
    oldVal = lookupOtherExpenditure(phoneNumber);
    updateUserOtherExpend(phoneNumber, oldVal + amount);
  }
}


/*
* Functions to interact with the database and update the tables
*/



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

var budgetSchema = new mongoose.Schema({
	phoneNo: String, 
	foodb: Number, 
	foode: Number, 
	entertainb: Number, 
	entertaine: Number, 
	clothingb: Number, 
	clothinge: Number,
	otherb: Number,
	othere: Number
});

var userBudget = mongoose.model('UserBudget', budgetSchema); 

function createUser(phoneNo){
	var userOne = new userBudget ({
	phoneNo: phoneNo, 
	foodb: 0, 
	foode: 0,
	entertainb: 0, 
	entertaine: 0,
	clothingb: 0, 
	clothinge: 0,
	otherb: 0,
	othere: 0		
	}); 
	
	userOne.save(function(err,userBudget){ 
	if(err) return console.error(err); 
	console.log('User Saved'); 
	}); 
}; 

function lookupUser(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('UserData \n',user);
	}); 
}; 

// GET VALUE FUNCTIONS /////////////////////////////////////////

function lookupFoodBudget(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	var thing = user[0].foodb ; 
	console.log('User Food Budget',thing); 
	return thing ; 
	}); 
}; 

async function lookupFoodExpenditure(userNo){
	userBudget.find({phoneNo: userNo}, {_id: 0, foode:1}), function (err, user) {
  console.log(user[0].foode);
    if (err) {
      console.error(err);
    }
    else{
      return user[0];
    } 
	//console.log('User Food Expenditure',thing); 
 
	}; 
}; 

function lookupEntertainBudget(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	var thing = user[0].entertainb ; 
	console.log('User Entertain Budget',thing); 
	return thing ; 
	}); 
}; 

function lookupEntertainExpenditure(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	var thing = user[0].entertaine ; 
	console.log('User Entertain Expenditure',thing); 
	return thing ; 
	}); 
}; 

function lookupClothingBudget(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	var thing = user[0].clothingb ; 
	console.log('User Clothing Budget',thing); 
	return thing ; 
	}); 
}; 

function lookupClothingExpenditure(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	var thing = user[0].clothinge ; 
	console.log('User Clothing Expenditure',thing); 
	return thing ; 
	}); 
}; 

function lookupOtherBudget(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	var thing = user[0].otherb ; 
	console.log('User other Budget',thing); 
	return thing ; 
	}); 
}; 

function lookupOtherExpenditure(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	var thing = user[0].othere ; 
	console.log('User other Expenditure',thing); 
	return thing ; 
	}); 
}; 

// MODIFY FUNCTIONS ////////////////////////////////////////////////////

function updateUserFoodExpend(userNo, amt){
	userBudget.updateOne({phoneNo: userNo}, {$set: {foode:amt}}, () => {
		console.log("worked");
	})
}

function updateUserFoodBudget(userNo, amt){
	userBudget.updateOne({phoneNo: userNo}, {$set: {foodb:amt}}, () => {
		console.log("worked");
	})
}

function updateUserEntertainExpend(userNo, amt){
	userBudget.updateOne({phoneNo: userNo}, {$set: {entertaine:amt}}, () => {
		console.log("worked");
	})
}

function updateUserEntertainBudget(userNo, amt){
	userBudget.updateOne({phoneNo: userNo}, {$set: {entertainb:amt}}, () => {
		console.log("worked");
	})
}

function updateUserClothingExpend(userNo, amt){
	userBudget.updateOne({phoneNo: userNo}, {$set: {clothinge:amt}}, () => {
		console.log("worked");
	})
}

function updateUserClothingBudget(userNo, amt){
	userBudget.updateOne({phoneNo: userNo}, {$set: {clothingb:amt}}, () => {
		console.log("worked");
	})
}


function updateUserOtherExpend(userNo, amt){
	userBudget.updateOne({phoneNo: userNo}, {$set: {othere:amt}}, () => {
		console.log("worked");
	})
}

function updateUserOtherBudget(userNo, amt){
	userBudget.updateOne({phoneNo: userNo}, {$set: {otherb:amt}}, () => {
		console.log("worked");
	})
}


