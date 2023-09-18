const User = require("../../models/User")
const Admin = require("../../models/Admin")
const { startOfDay, endOfDay } = require("date-fns")
const AdminNotification = require("../../models/AdminNotification")

exports.dashboard = async(req, res) => {
    try{

        let today = new Date()
        const totalusers = await User.find({usertype: "user"}).count()
        const totalowners = await User.find({usertype: "owner"}).count()
        const totalnewusers = await User.find({usertype: "user",createdat: {$gte: startOfDay(today), $lte: endOfDay(today)}}).count()
        const totalnewowners = await User.find({usertype: "owner",createdat: {$gte: startOfDay(today), $lte: endOfDay(today)}}).count()
        const pendingapprovals = await AdminNotification.find({status:"pending"}).count()
        const apprating = 0;


        res.status(201).send({totalusers, totalowners, totalnewusers, totalnewowners, pendingapprovals, apprating})

    }catch(error){
        res.send({error: error.message})
    }
}