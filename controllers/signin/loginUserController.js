const User = require("../../models/User");
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// exports.loginUser = async(req,res) => {
//     try{

       
//         const {email,password}=req.body;

//         let user = await User.findOne({email})

//         if(!user){
//             res.status(405).send({message:"user not exists ,Please register"})
//         }

//        const checkPassword =await bcrypt.compare(password,user.password);

//        if(!checkPassword){
//         res.status(405).send({message:"Wrong Password"})
//        }

//         let token=await user.generateAuthToken()
//         console.log("login to user",user)
//         res.status(201).send({user:user,token:token})


//     }catch(error){
//         res.send({error: error.message})
//     }
// }


exports.loginUser = async (req, res) => {
    try {
        const { mobile } = req.body;

        let user = await User.findOne({ mobile });
        if (!user) {
            return res.status(404).send({ message: "User not found, please register" });
        }

        const otpResult = await client.verify.services(process.env.TWILIO_SERVICE)
            .verifications.create({ to: mobile, channel: 'sms' });
        if (otpResult.status !== "pending") {
            return res.status(500).send({ message: "Failed to send OTP" });
        }
        console.log("OTP sent successfully")
        res.status(200).send({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


exports.verifyOTPForUser = async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        let user = await User.findOne({mobile: mobile, usertype: req.params.userType});
        if (!user) {
            return res.status(404).send({ message: "User not found, please register" });
        }
        const verificationCheck = await client.verify.services(process.env.TWILIO_SERVICE)
            .verificationChecks.create({ to: mobile, code: otp });

        if (verificationCheck.status !== "approved") {
            return res.status(401).send({ message: "Invalid OTP" });
        }

        const token = await user.generateAuthToken();
        res.status(200).send({ message: "User successfully Login..!!" , user, token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};