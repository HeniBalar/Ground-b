const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"});

const activitySchema = new mongoose.Schema({
    userid: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Number,
        default: 1
    }
})

const U_Activity = mongoose.model('Useractivitys',activitySchema)

module.exports = U_Activity