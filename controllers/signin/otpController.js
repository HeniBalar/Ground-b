const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const User = require("../../models/User")
  

exports.sendOTP = async(req,res) => {
    try{
        await client.verify.services(process.env.TWILIO_SERVICE).verifications.create({to: req.body.mobile, channel: 'sms'})
        res.status(200).send("OK")

    }catch(error){
        let msg;
        let code=error.code
        console.log("errorcode",error)
        if(error.code===60200){
            msg = "Invalid Parameter"
        }else if(error.code===60203){
            msg = 'You have attempted to get the verification code more than 5 times within 10 min. Wait for the verification to expire (10 minutes).'
        }else if(error.code===60202){
            msg = 'You can check verification code maximun 5 times only, after that you will need to wait until the current verification expires (10 minutes) to create a new verification.'
        }else if(error.code===20404){
            msg = 'OTP is already verified successfully.'
        }else{
            msg = error.message
        }
        console.log("error",error)
        res.send({error: msg,code:code})
    }

}   

exports.verifyOTP = async(req,res) => {

    try{
        const otp = await client.verify.services(process.env.TWILIO_SERVICE).verificationChecks.create({to: req.body.mobile, code: req.body.otp})
        let user;
        let token;
        console.log("....otp...",otp)
        if(otp.status==="approved"){
            console.log("if")
            user = await User.findOne({mobile: req.body.mobile, usertype: req.params.userType})
            console.log("user...",user)
            if(!user){
                user = new User({mobile: req.body.mobile, usertype: req.params.userType, createdat: new Date()})
                await user.save()
                token = await user.generateAuthToken()
                res.status(201).send({new:"true",user, token})
            }else{
                token = await user.generateAuthToken() 
                res.status(201).send({new:"false",user, token})
            }
                
        }else{
            console.log("else")
            res.status(401).send()
        }
    }catch(error){
        console.log("error...",error.message)
        res.send({error:error.message})
    }

}   
