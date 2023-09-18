const Booking = require("../models/Booking")
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

exports.getBookings = async(req, res) => {
    try{
        let bookings;
        if(req.user.usertype==="owner"){
            bookings = await Booking.find({ownerid: req.user._id})
            console.log("bookings")
        }else{
            bookings = await Booking.find({bookedby: req.user._id})
            console.log("bookingsbookings")
        }
        
        console.log("aaa")
        res.status(201).send(bookings)
        
    }catch(error){
        console.log("error")
        res.send({error: error.message})
    }
}