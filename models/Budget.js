const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
	phoneNo: String, 
	foodSpent: Number, 
	foodBudget: Number, 
	entertainSpent: Number, 
	entertainBudget: Number, 
	clothingSpent: Number, 
	clothingBudget: Number,
	otherSpent: Number,
	otherBudget: Number
});

module.exports = Budget = mongoose.model('budget', BudgetSchema);