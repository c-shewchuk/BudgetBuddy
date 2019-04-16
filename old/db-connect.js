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
	foodb: [Number], 
	foode: [Number], 
	entertainb: [Number], 
	entertaine: [Number], 
	clothingb: [Number], 
	clothinge: [Number],
	otherb: [Number],
	othere: [Number]
});
var userBudget = mongoose.model('UserBudget', budgetSchema); 



function createUser(phoneNo){
	var userOne = new userBudget ({
	phoneNo: phoneNo, 
	foodb: [0], 
	foode: [0],
	entertainb: [0], 
	entertaine: [0],
	clothingb: [0], 
	clothinge: [0],
	otherb: [0],
	othere: [0]		
	}); 
	
	userOne.save(function(err,userBudget){ 
	if(err) return console.error(err); 
	console.log('User Saved'); 
	}); 
};


function lookupUser(userNo){
	userBudget.find({phoneNo: userNo},function (err, user) {
	if (err) return console.error(err);
	console.log('In Query,',user);
	}); 
};