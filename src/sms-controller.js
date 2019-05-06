/*
The parsing function is the only export. Everything else will be handled here, at least for the SMS portion.
*/
const db = require('./db');
db.connection.connect();

var parse = function(req, res){
    var message = req.body.Body;
    message = message.split(" ");
    var stringRespone = "";
    var command = message[0];
    var category = message[1];
    var dollarAmount = float(message[2]);
    
    if (command == 'helpme'){
        stringRespone = help();
    }
  
    if(command == 'create'){
        stringRespone = await createAccount(req, message);
    }
  
    if (command == 'log'){
        stringRespone = await log(req, category, dollarAmount);
    }
  
    if (command == 'report'){
        stringResponse = await report(req);
    }
  
    if (command == 'set'){
       stringRespone = await set(req, category, dollarAmount);
    }

    if (stringResponse == ""){
        stringRespone = helpme();
    }

    return stringRespone;
}


// For an account creation, the message is different, but we need it. They must provide first and last name.
var createAccount = async function(req, message){
    var phoneNumber = req.body.From;
    db.connection.query(`INSERT INTO users(phone_number, first_name, last_name) VALUES ('${phoneNumber}', '${message[1]}', '${message[2]}')`, (err) => {
        if (err)
            throw err;
        else
        var string = `Hey ${message[1]}! Welcome to BudgetBuddy. 
        Lets set your budgets up! Reply with "set total " and an amount and we'll take care of the rest! You can also set a budget for clothes, and food`;
        return string;
    });  
}

var log = async function(req, category, dollarAmount){
    var phoneNumber = req.body.From;

}

/*
Maintain and set the budget values
*/
var set = async function(req, category, dollarAmount){
    var phoneNumber = req.body.From;
    db.connection.query(`UPDATE users SET ${category}_budget=${dollarAmount} WHERE phone_number=${phoneNumber}`, (err) => {
        
    });
}

var report = async function(req){

}


var help  = function() {
    var string = 'BudgetBuddy is a simple SMS app that allows you to easily track your budget, anywhere!!\n';
  string = string + 'To get started, text us the word create and we will get you setup!\n';
  string = string + 'To set your budget for each category, text set category amount. Available categories are food and clothes\n';
  string = string + 'To add money you have spent, text log category amount\n';
  string = string + 'To see a weekly report, text report weekly\n';
  string = string + 'To see a monthly report, text report monthly\n';
  string = string + 'As always, text helpme to get some help';
  return string;
}

module.exports.parse = parse;

