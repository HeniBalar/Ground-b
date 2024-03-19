

const User = require("../../models/User");

exports.registerUser = async(req,res) => {
    try {
        const {first_name,last_name,mobile,email,usertype} = req.body;

        // let user = await User.findOne({email:email, usertype:usertype})
        let user = await User.findOne({mobile:mobile, usertype:usertype})
        if (user) {
            console.log("user already exists ,Please login")
            return res.status(405).send({message:"user already exists ,Please login"})
        } else {
        const data={
            first_name,
            last_name,
            email,
            mobile,
            usertype
        }

        user=new User(data)
        await user.save()

        let token=await user.generateAuthToken()
        console.log("created user",user)
        res.status(201).send({user:user,token:token})
    }

    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

