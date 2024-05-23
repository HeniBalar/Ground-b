const Booking = require("../models/Booking")
const User = require("../models/User")

exports.showPendingBooking = async(req, res) => {
    try{
        const { email } = req.body
        const user = await User.findOne({ email: email }); // console.log('user.....', user)
        let bookings;
        if(user.usertype === "owner"){
            bookings = await Booking.find({ownerid: user._id})
        }else{
            bookings = await Booking.find({bookedby: user._id})
        }

        bookings.forEach(booking => {
            if(booking.status == "Pending") return res.status(200).send({ bookings })
                else return res.status(404).send({ message: "Pending bookings are not found." })
        })
    }catch(error){
        console.error({ error: error.message })
        res.send({ error: error.message })
    }
}

//create upcoming pending complate booking API