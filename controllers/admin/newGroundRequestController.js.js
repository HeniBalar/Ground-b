const Ground = require("../../models/Ground")
const User = require("../../models/User")
const Admin = require("../../models/Admin")
const admin = require("../../utils/firebase");
const AdminNotification = require("../../models/AdminNotification");
const Notification = require("../../models/Notification");
const cloudinary = require("../../utils/cloudinary")

exports.newGroundRequest = async(req, res) => {
    try{

        let data = {}
        let payload = {}
        let g = await Ground.findById(req.body.ground)
        let o = await User.findById(g.ownerid)
        let registrationToken = o.fcmtoken

        if(req.body.status==="approved"){

            await Ground.findByIdAndUpdate(req.body.ground,{status: "approved"})
            //await AdminNotification.findOneAndUpdate({_id: req.body._id}, {status: "approved", seenat: new Date(), seenby: req.admin._id}, {new: "true"})
            await AdminNotification.findOneAndUpdate({_id: req.body._id}, {status: "approved", seenat: new Date(), seenby: "62d1359255be03e8de14c1ae"})
            await Admin.updateMany({pendingapprovals: {$gte : 1}},{$inc: {'pendingapprovals' : -1}}, {new: "true"})
            await User.findOneAndUpdate({_id: g.ownerid},{$inc: {'noofownedgrounds': 1}})

            data = {
                type: "groundadded",
                ground: g,
                message: `Your request to add ground ${g.groundname} has been accepted`,
                created: new Date()
            }

            payload = {
                "notification": {
                    "title": `Hello, ${o.name}`,
                    "body": `Your ground has been accepted.`,
                }
            };

            // if(lang!=='ar'){
            //     let ground_ar = {
            //         ...ground,
            //         groundname: await translate.translate(ground.groundname,lang),
            //         location: await translate.translate(ground.location,lang),
            //         ownername: await translate.translate(ground.ownername,lang),
            //         address: await translate.translate(ground.address,lang),
            //         description: await translate.translate(ground.description,lang),
            //     }
            //     res.status(201).send(ground_ar)
            // }

        }else if(req.body.status==="rejected"){
            
            await Ground.findByIdAndUpdate(req.body.ground,{status: "rejected"})
            //await AdminNotification.findByIdAndUpdate({_id: req.body._id}, {status: "rejected", seenat: new Date(), seenby: req.admin._id})
            await AdminNotification.findByIdAndUpdate({_id: req.body._id}, {status: "rejected", seenat: new Date(), seenby: "62d1359255be03e8de14c1ae"})
            await Admin.updateMany({pendingapprovals: {$gte : 1}},{$inc: {'pendingapprovals' : -1}})

            for(let i in req.body.data.ground.photos){
                cloudinary.uploader.destroy(req.body.data.ground.photos[i].photoid);
            }

            data = {
                type: "groundrejected",
                ground: g,
                message: `Your request to add ground ${g.groundname} has been rejected`,
                created: new Date()
            }

            payload = {
                "notification": {
                    "title": `Hello, ${o.name}`,
                    "body": `Your ground has been rejected.`,
                }
            };
        }

        if(registrationToken!==null){
            await admin.messaging().sendToDevice([registrationToken], payload)
        }
        
        const n = new Notification({data, tokens:[registrationToken], receivers: [o._id], createdat: data.created})
        await n.save()

        res.sendStatus(200)
        
    }catch(error){
        res.send({error: error.message})
    }
}