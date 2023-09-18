const User = require("../models/User")

exports.setFCMToken = async(req,res) => {
    try{

        await User.findByIdAndUpdate(req.user._id, {fcmtoken: req.body.fcmtoken})
        res.sendStatus(200)

    }catch(error){
        res.send({error: error.message})
    }

}