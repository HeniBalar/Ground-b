const Team = require("../models/Team")
const { ObjectId } = require("mongodb")
const User = require("../models/User")
const Notification = require("../models/Notification")
const admin = require("../utils/firebase")

exports.createTeam = async(req, res) => {
    try{

        if(req.user.usertype==="user"){

            let sp = [{
                memberid: ObjectId(req.user._id)
            }]

            const team = new Team({
                name: req.body.name,
                createdby: req.user._id,
                members: sp
            })
            console.log("sp...",sp)
            await team.save()
            res.status(201).send(team)

        }else{
            throw new Error("Only users are allowed to persorm this action")
        }

    }catch(error){
        res.send({error: error.message})
    }
}

exports.getTeam = async(req, res) => {
    try{

        if(req.user.usertype==="user"){


            const team = await Team.findById(req.params.id)
                                    .populate('members.memberid','name profile mobile')
                                    .populate('createdby','name profile mobile').lean()

            let noofplayers = team.members.length
            res.status(201).send({...team, noofplayers})

        }else{
            throw new Error("Only users are allowed to persorm this action")
        }

    }catch(error){
        res.send({error: error.message})
    }
}


exports.getallplayers = async(req, res) => {
    try{

        const players = await User.find({usertype: "user", status: "Active"}).select("name mobile profile").sort({"createdat":"asc"});
        res.status(201).send({players})

    }catch(error){
        res.send({error: error.message})
    }

}


exports.getallteams = async(req, res) => {
    try{

        const teams = await Team.find({}).populate('createdby','name profile mobile').sort({"createdat":"asc"}).lean();

        let t = []

        for(let i=0; i<teams.length; i++){
            let temp = {
                _id: teams[i]._id,
                name: teams[i].name,
                createdby: teams[i].createdby,
                noofplayers: teams[i].members.length
            }
            t.push(temp)
        }

        res.status(201).send({teams: t})

    }catch(error){
        res.send({error: error.message})
    }

}

exports.acceptTeamInvite = async(req, res) => {
    try{

        const team = await Team.findById(req.body.teamid)
            .populate('members.memberid','name profile mobile')
            .populate('createdby','name profile mobile').lean()

        await Notification.findByIdAndUpdate(req.body.nid, {status: "accepted", seenby: req.user._id, seenat: new Date()}) 

        let m = team.members
        let receivers = []
        let registrationToken = []
        for(let i=0; i<m.length; i++){
            receivers.push(m[i]._id)
            if(m[i].fcmtoken){
                registrationToken.push(m[i].fcmtoken)
            }
        }

        data = {
            type: "acceptteaminvite",
            sender: req.user,
            team: team,
            message: `${req.user.name} joined team ${team.name}`,
            created: new Date()
        }
        payload = {
            "notification": {
                "title": `Playing Invitation`,
                "body": `${req.user.name} joined team ${team.name}`
            }
        }; 

        if(registrationToken.length!==0){
            const response = await admin.messaging().sendToDevice(registrationToken, payload)
            console.log("notification sent....",response)
        }
        
        const n = new Notification({data, tokens: registrationToken, receivers, createdat: data.created})
        await n.save()

        if(n){
            res.sendStatus(200)
        }

    }catch(error){
        res.send({error: error.message})
    }
}


exports.rejectTeamInvite = async(req, res) => {
    try{

        const team = await Team.findById(req.body.teamid)
            .populate('members.memberid','name profile mobile')
            .populate('createdby','name profile mobile fcmtoken').lean()

        await Notification.findByIdAndUpdate(req.body.nid, {status: "rejected", seenby: req.user._id, seenat: new Date()})

        data = {
            type: "rejectteaminvite",
            sender: req.user,
            team: team,
            message: `${req.user.name} rejected your invite to join team ${team.name}`,
            created: new Date()
        }
        payload = {
            "notification": {
                "title": `Playing Invitation`,
                "body": `${req.user.name} rejected your invite to join team ${team.name}`
            }
        }; 

        if(team.createdby.fcmtoken){
            const response = await admin.messaging().sendToDevice(team.createdby.fcmtoken, payload)
            console.log("notification sent....",response)
        }
        
        const n = new Notification({data, tokens: [team.createdby.fcmtoken], receivers: [team.createdby._id], createdat: data.created})
        await n.save()

        if(n){
            res.sendStatus(200)
        }

    }catch(error){
        res.send({error: error.message})
    }
}
