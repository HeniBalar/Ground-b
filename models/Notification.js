const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({

    data: {
        type : Object
    },
    tokens: [{
        type: String,
        default: null
    }],
    receivers:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    status:{
        type: String,
        default: "pending"
    },
    seenby:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    seenat: {
        type: Date
    },
    createdat:{
        type: Date,
    }
})

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification
