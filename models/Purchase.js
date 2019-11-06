const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    purchaseAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Purchase = mongoose.model('purchase', PurchaseSchema);