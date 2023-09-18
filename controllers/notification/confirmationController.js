// const { translate } = require("../../utils/translate")
const admin = require("../../utils/firebase")
const dotenv = require("dotenv");
const Ground = require("../../models/Ground");
const Booking = require("../../models/Booking");
const Team = require("../../models/Team");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
const { ObjectId } = require("mongodb")
dotenv.config({path:"config/config.env"})


exports.sendConfirmation = async(req, res) => {
    try{
    
        const sender = req.user
        const type = req.body.type
        const nid = req.body.nid
        const noti = await Notification.findById(nid)
        const touser = await User.findById(noti.data.sender._id).select('fcmtoken')
        const registrationToken = touser.fcmtoken
        const team = req.body.teamid? await Team.findById(req.body.teamid) : null
        const ground = req.body.groundid? await Ground.findById(req.body.groundid) : null
        console.log("ground.",ground)

        var data = {}
        var notification = {}

        switch(type){
            case "teamaccept":

                var members = team.members
                members.push({
                    memberid: ObjectId(element)
                })

                await Team.findByIdAndUpdate(team._id, {members})
                await Notification.findByIdAndUpdate(nid, {status: "accepted", seenby: sender._id, seenat: new Date()})
                data = {
                    type: "teamaccept",
                    sender: sender,
                    message: `Your request to join team ${team.name} has been accepted`,
                    created: new Date()
                }
                payload = {
                    "notification": {
                        "title": `Team join request accepted`,
                        "body": `Your request to join team ${team.name} has been accepted`,
                    }
                };
                break;
            
            case "teamreject":
                await Notification.findByIdAndUpdate(nid, {status: "rejected", seenby: sender._id, seenat: new Date()})
                data = { 
                    type: "teamreject",
                    sender: sender,
                    message: `Your request to join team ${team.name} has been rejected`,
                    created: new Date()
                }
                payload = {
                    "notification": {
                        "title": `Team join request rejected`,
                        "body": `Your request to join team ${team.name} has been rejected`,
                    }
                };
                break;

            case "groundaccept":

                await User.findByIdAndUpdate(touser._id, {$inc : {'noofbooking' : 1}})
                await Ground.findByIdAndUpdate(ground._id, {$inc: {'nooftimebooked': 1}})
                await Notification.findByIdAndUpdate(nid, {status: "accepted", seenby: sender._id, seenat: new Date()})
                await Booking.findOneAndUpdate({notificationid: nid},{status: "accepted"})

                data = { 
                    type: "groundaccept",
                    sender: sender,
                    message: `Your request to book ground ${ground.groundname} has been accepted`,
                    created: new Date()
                }
                payload = {
                    "notification": {
                        "title": `Ground Booking Accepted`,
                        "body": `Your request to book ground ${ground.groundname} has been accepted`,
                    }
                };
                break;

            case "groundreject":
                await Notification.findByIdAndUpdate(nid, {status: "rejected", seenby: sender._id, seenat: new Date()})
                await Booking.findOneAndUpdate({notificationid: nid},{status: "rejected"})
                data = { 
                    type: "groundreject",
                    sender: sender,
                    message: `Your request to book ground ${ground.groundname} has been rejected`,
                    created: new Date()
                } 
                payload = {
                    "notification": {
                        "title": `Ground Booking Rejected`,
                        "body": `Your request to book ground ${ground.groundname} has been rejected`,
                    }
                }; 
                break;

            default:
                break;
        }

        if(registrationToken!==null){
            await admin.messaging().sendToDevice(registrationToken, payload)
        }
            
        const n = new Notification({data, tokens: [registrationToken], receivers: [touser._id], createdat: data.created})
        await n.save()

        if(n){
            res.sendStatus(200)
        }

    }catch(error){
        res.send({error: error.message})
    }
}