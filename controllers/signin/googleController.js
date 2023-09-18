const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

const {OAuth2Client} = require('google-auth-library');
const User = require("../../models/User");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.authGoogle = async(req,res) => {
    try{
        console.log("idToken..",req.params.idToken)
        const ticket = await client.verifyIdToken({
            idToken: req.params.idToken,
            audience: [
                "99090239827-tnpiu1592nosj1i986m96flt2qsrtaqv.apps.googleusercontent.com",
                "99090239827-m3l436r1es417m740bqna1nafude9kuv.apps.googleusercontent.com"
            ]
        });
        const payload = ticket.getPayload();
        console.log("payload...",payload)
        let user = await User.findOne({socialid : payload.sub, usertype: req.params.userType})
        let flag ;
        console.log("user...",user)

        if(!user){
            const data = {
                socialid : payload.sub,
                name : payload.name,
                email: payload.email,
                profile: {
                    pid: null,
                    purl: payload.picture
                },
                usertype: req.params.userType
            }
            user = new User(data)
            await user.save()

            flag = true
            
        }else{
            flag = false
        }

        let token = await user.generateAuthToken()

        res.status(201).send({new:flag, user: user, token: token})

    }catch(error){
        res.send({error: error.message})
    }
}