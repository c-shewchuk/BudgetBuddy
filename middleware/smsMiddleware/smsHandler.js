const mongoose = require('mongoose');
const Budget = require('../../models/Budget');

const helpme = () => {
    let string = 'BudgetBuddy is a simple SMS app that allows you to easily track your budget, anywhere!!\n';
    string = string + 'To get started, text us the word create and we will get you setup!\n';
    string = string + 'To set your budget for each category, text set category amount. Available categories are food and clothes\n';
    string = string + 'To add money you have spent, text log category amount\n';
    string = string + 'To see a weekly report, text report weekly\n';
    string = string + 'To see a monthly report, text report monthly\n';
    string = string + 'As always, text helpme to get some help';
    return string;
}

const createNewUser = (phoneNumber, callback) => {
    const newUser =  new Budget({
        phoneNo: phoneNumber,
        foodSpent: 0, 
	    foodBudget: 0, 
	    entertainSpent: 0, 
	    entertainBudget: 0, 
	    clothingSpent: 0, 
	    clothingBudget: 0,
	    otherSpent: 0,
	    otherBudget: 0
    });

    newUser.save()
     .then(console.log("New User created"))
     .catch(err => console.log(err));
    callback();
};

const logItem = (phoneNumber, category, amount) => {

}

const report = (phoneNumber, category, amount) => {

}

const setBudget = (phoneNumber, category, amount) => {

};

module.exports = {
    helpme,
    createNewUser,
    logItem,
    report,
    setBudget
}