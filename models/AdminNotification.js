const mongoose = require('mongoose');

const adminNotificationSchema = new mongoose.Schema({

    data: {
        type : Object
    },
    status:{
        type: String,
        default: "pending"
    },
    seenby:{
        type: mongoose.Schema.Types.ObjectId, ref:'Admin'
    },
    seenat: {
        type: Date
    },
    createdat:{
        type: Date,
    }
})

const AdminNotification = mongoose.model('AdminNotification', adminNotificationSchema)

module.exports = AdminNotification
