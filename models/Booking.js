const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    bookedby:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    groundid:{
        type: mongoose.Schema.Types.ObjectId, ref:'Ground'
    },
    ownerid:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    notificationid:{
        type: mongoose.Schema.Types.ObjectId, ref:'Notification'
    },
    starttime:{
        type: Date,
        required: true
    },
    endtime:{
        type: Date,
        required: true
    },
    createdat:{
        type: Date,
        default: new Date()
    },
    status:{
        type: String,
        default: "Pending"
    }
})


const Booking = mongoose.model('Booking',bookingSchema)

module.exports = Booking