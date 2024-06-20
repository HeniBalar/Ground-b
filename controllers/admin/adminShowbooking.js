const Booking = require('../../models/Booking')
const Ground = require('../../models/Ground')

exports.totalBooking = async (req, res) => {
    try {

        const booking = await Booking.find({})
        console.log('bookig/...', booking)
        
        return res.status(200).send({ message: "OK" })
    } catch (error) {
        console.log('error/...', error)
        return res.status(500).send({ error: error.message })
    }
}

exports.bookingTrends = async (req, res) => {
    try {
    
        const booking = await Booking.find({})
        let gID = []
        booking.forEach((item) => {
            gID.push(item.groundid)
        })
        const uniqueObject = {};
        gID.forEach(item => {
            uniqueObject[item] = true;
        });
        const groundId = Object.keys(uniqueObject)
        console.log('groundid/...', groundId)
        const ground = await Ground.find({})

        ground.forEach((item) => {
            if(item.rating >= "4"){
                groundId.forEach((x) => {
                    if(item._id.toString() == x){
                        console.log('item/..', item)
                        console.log('x/...', x)
                    }
                })
            }
        })
        
        return res.status(200).send({ message: "OK" })
    } catch (error) {
        console.log('error/...', error)
        return res.status(500).send({ error: error.message })
    }
}

exports.bookingValue = async (req, res) => {
    try {
    
        
        
        return res.status(200).send({ message: "OK" })
    } catch (error) {
        console.log('error/...', error)
        return res.status(500).send({ error: error.message })
    }
}