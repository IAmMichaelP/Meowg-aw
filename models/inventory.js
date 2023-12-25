const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    amount: {
        type: Number,
    },
    supplies: {
        type: String,
        amount: Number
    },
    weeklyExpenses: {
        type: Number
    },
    week: {
        type: Date
    }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;