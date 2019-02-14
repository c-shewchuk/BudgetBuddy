// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connnected to Mongoose DB"); 
});

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

function lookupFoodExpenditure(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	var thing = user[0].foode ; 
	console.log('User Food Expenditure',thing); 
	return thing ; 
	}); 
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

