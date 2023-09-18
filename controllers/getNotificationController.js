const Notification = require("../models/Notification")

exports.getNotification = async(req, res) => {
    try{

        const nos = await Notification.find({receivers: req.user._id}).sort({'createdat': 'desc'})
        res.status(201).send(nos)

    }catch(error){
        res.send({error: error.message})
    }
}