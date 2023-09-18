

const User = require("../../models/User");
const bcrypt=require('bcryptjs')

exports.loginUser = async(req,res) => {
    try{

       
        const {email,password}=req.body;

        let user = await User.findOne({email})

        if(!user){
            res.status(405).send({message:"user not exists ,Please register"})
        }

       const checkPassword =await bcrypt.compare(password,user.password);

       if(!checkPassword){
        res.status(405).send({message:"Wrong Password"})
       }

        let token=await user.generateAuthToken()
        console.log("login to user",user)
        res.status(201).send({user:user,token:token})


    }catch(error){
        res.send({error: error.message})
    }
}