const admin = require("../../utils/firebase")
const dotenv = require("dotenv");
const Team = require("../../models/Team");
const User = require("../../models/User");
const Notification = require("../../models/Notification");
const { ObjectId } = require("mongodb")
dotenv.config({path:"config/config.env"})

exports.sendNotification = async(req, res) => {
    try{

        const sender = req.user
        let temp_tousers = req.body.tousers ? req.body.tousers : []
        console.log("tousers...",temp_tousers)
        console.log("typeof()...",typeof(temp_tousers))
        temp_tousers = temp_tousers.replace("[","")
        temp_tousers = temp_tousers.replace("]","")
        console.log("[].....", temp_tousers)
        let tousers = temp_tousers.split(",")
        console.log("changed..tousers...",tousers)
        const type = req.body.type
        const team = req.body.teamid? await Team.findById(req.body.teamid) : null
        var receivers = []
        var data = {}
        var payload = {}
        var registrationToken = []

        for(let i=0; i<tousers.length; i++){
            const t = await User.findById(ObjectId(tousers[i].trim()))
            console.log("t...",t)
            if(t.fcmtoken){
                registrationToken.push(t.fcmtoken)
            }
            receivers.push(t._id)
        }

        switch(type){
            case "addtoteam":
                data = {
                    type: "addtoteam",
                    sender: sender,
                    team: team,
                    message: `${sender.name} send you a playing invitation to join team ${team.name}`,
                    created: new Date()
                }
                payload = {
                    "notification": {
                        "title": `Playing Invitation`,
                        "body": `${sender.name} send you a playing invitation to join team ${team.name}`,
                    }
                }; 
                break;
            
            case "jointeam":
                let players = team.members
                for(let i=0; i<players.length; i++){
                    const t = await User.findById(players[i].memberid)
                    if(t.fcmtoken){
                        registrationToken.push(t.fcmtoken)
                    }
                    receivers.push(t._id)
                }
                data = {
                    type: "jointeam",
                    sender: sender,
                    team: team,
                    message:`${sender.name} wants to join team ${team.name}`,
                    created: new Date()
                }  
                payload = {
                    "notification": {
                        "title": `Team Invitation`,
                        "body": `${sender.name} wants to join team ${team.name}`,
                    }
                }; 
                break;

            default:
                break;

        }
        console.log("registrationToken...",registrationToken)
        if(registrationToken.length!==0){
            const response = await admin.messaging().sendToDevice(registrationToken, payload)
            console.log("notification sent....",response)
        }
        
        const n = new Notification({data, tokens: registrationToken, receivers, createdat: data.created})
        await n.save()

        console.log("n....",n)

        if(n){
            res.sendStatus(200)
        }

    }catch(error){
        res.send({error: error.message})
    }
}