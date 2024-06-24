const Booking = require('../../models/Booking')
const Ground = require('../../models/Ground')

exports.totalBooking = async (req, res) => {
    try {

        const booking = await Booking.find({})
        // console.log('bookig/...', booking)
        
        return res.status(200).send({ message: "OK", booking })
    } catch (error) {
        console.log('error/...', error)
        return res.status(500).send({ error: error.message })
    }
}

exports.bookingTrends = async (req, res) => {
    try {
        const bookings = await Booking.find({});
        let groundIds = bookings.map(item => item.groundid);

        groundIds = [...new Set(groundIds)];

        const grounds = await Ground.find({ _id: { $in: groundIds } });

        const trendingGround = grounds.filter(item => item.rating >= 4);

        // console.log("Trending Grounds: ", trendingGround);
        
        return res.status(200).send({ message: "OK", trendingGround });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).send({ error: error.message });
    }
}

exports.bookingValue = async (req, res) => {
    try {
    
        const booking = await Booking.find({})
        let groundIds = booking.map((item) => item.groundid )
        groundIds = [...new Set(groundIds)]
        const grounds = await Ground.find({ _id: { $in: groundIds } })

        grounds.forEach((item) => {
                        
        })
       
        return res.status(200).send({ message: "OK" })
    } catch (error) {
        console.log('error/...', error)
        return res.status(500).send({ error: error.message })
    }
}