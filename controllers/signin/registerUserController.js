

const User = require("../../models/User");
const bcrypt=require('bcryptjs')

exports.registerUser = async(req,res) => {
    try {
        const {name,mobile,email,password,usertype} = req.body;

        let user = await User.findOne({email:email, usertype:usertype})

        if (user) {
            console.log("user already exists ,Please login")
            return res.status(405).send({message:"user already exists ,Please login"})
        } else {
        const np =await bcrypt.hash(password,10);

        const data={
            name,
            email,
            password:np,
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

