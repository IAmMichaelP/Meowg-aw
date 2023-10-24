const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true

    },
    interviewMode: {
        type: String,
        required: true

    },
    interviewSchedule: {
        type: Date,
        required: true

    },
    strayName: {
        type: String,
        required: true

    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;