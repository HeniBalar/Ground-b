const Ground = require("../../models/Ground")
const Notification = require("../../models/Notification")
const admin = require("../../utils/firebase")
const dotenv = require("dotenv");
const User = require("../../models/User");
const Booking = require("../../models/Booking");
dotenv.config({path:"config/config.env"})

exports.bookGround = async(req, res) => {
    try{

        if(req.user.usertype==="user"){
            
            const g = await Ground.findById(req.body.groundid)
            const o = await User.findById(g.ownerid)
            const sender = req.user
            let receivers = [o._id]
            let registrationToken = o.fcmtoken===null ? [] : [o.fcmtoken]
            let data = {
                type: "ground",
                sender: sender, 
                ground: g,
                message:`${sender.name} wants to book yor ground ${g.groundname}`,
                created: new Date()
            }
            payload = {
                "notification": {
                    "title": `Ground Booking Request`,
                    "body": `${sender.name} wants to book yor ground ${g.groundname}`,
                }
            }; 

            if(o.fcmtoken!==null){
                await admin.messaging().sendToDevice(registrationToken, payload)
            }

            const n = new Notification({data, tokens: registrationToken, receivers, createdat: data.created})
            await n.save()

            let bookingData = {
                ...req.body,
                createdat: new Date(),
                notificationid: n._id,
                ownerid: o._id,
                bookedby: sender._id
            }

            const b = new Booking(bookingData)
            await b.save()

            res.status(201).send(b)

        }else{
            throw new Error("Only users are allowed to persorm this action")
        }

    }catch(error){
        res.send({error: error.message})
    }
}

