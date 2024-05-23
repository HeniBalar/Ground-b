const Booking = require("../models/Booking")
const User = require("../models/User")
const Ground = require("../models/Ground")
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

// exports.getBookings = async(req, res) => {
//     try{
//         let bookings;
//         if(req.user.usertype==="owner"){
//             bookings = await Booking.find({ownerid: req.user._id})
//             console.log("bookings")
//         }else{
//             bookings = await Booking.find({bookedby: req.user._id})
//             console.log("bookingsbookings")
//         }
        
//         console.log("aaa")
//         res.status(201).send(bookings)
        
//     }catch(error){
//         console.log("error")
//         res.send({error: error.message})
//     }
// }

exports.getBookings = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.find({ email: email }); // console.log('user...', user[0])
        const g_ownerid = await Ground.findOne({ groundid: req.body.groundid }); // console.log('goid', g_ownerid.ownerid)
        const booking = new Booking({
            bookedby: await user[0]._id,
            groundid: req.body.groundid,
            ownerid: g_ownerid.ownerid,
            starttime: req.body.starttime,
            endtime: req.body.endtime
        })
        const newBooking = await booking.save()
        // console.log('newBooking.....', newBooking)
        res.status(200).send({ newBooking, message: "Booking conformed." })
    } catch (error) {
        console.error({ error: error.message })
        res.status(500).send({ error: error.message })
    }
}