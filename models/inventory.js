const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplyDetailsSchema = new Schema({
    type: String, // 'supply type'
    amount: Number,
});

const weekSchema = new Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

const inventorySchema = new Schema({
    amount: {
        type: Number,
    },
    supplies: {
        type: supplyDetailsSchema,
        amount: Number
    },
    weeklyExpenses: {
        type: Number
    },
    week: {
        type: weekSchema,
        required: true
    },
    rescuedAnimals: {
        type: Number
    }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
