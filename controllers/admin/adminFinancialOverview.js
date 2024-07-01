const Booking = require('../../models/Booking')
const Ground = require('../../models/Ground')

exports.totalRevenue = async (req, res) => {  // 10% commision for admin when owner's booked ground by user...
    try {
        
        
        return res.status(200).send({ message: "OK", totalRevenue })
    } catch (error) {
        console.log('Error:', error)
        return res.status(500).send({ error: error.message })
    }
}

exports.revenueGrowth = async (req, res) => {  // last year compare to present how much growth in present year...
    try {
        
        return res.status(200).send({ message: "OK" })
    } catch (error) {
        console.log('Error:', error)
        return res.status(500).send({ error: error.message })
    }
}

exports.revenueBreakdown = async (req, res) => {  // which location and which sport mostly booked by user that location...
    try {
        
        return res.status(200).send({ message: "OK" })
    } catch (error) {
        console.log("Error:", error)
        return res.status(500).send({ error: error.message })
    }
}