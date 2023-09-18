const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})
const bcrypt=require('bcryptjs')
const User = require("../../models/User");
const jwt=require('jsonwebtoken')
exports.editUser = async(req,res) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
       
        const user=await User.findOne({_id:decoded._id})

        let result;

        const data=req.body

        // name, email, pass, user photo 
        if(data.name!=undefined){
             result = await user.updateOne({name:data.name});
        }

        if(data.email!=undefined){
            result = await user.updateOne({email:data.email});
        }

      
        if(data.password!=undefined){
        const np =await bcrypt.hash(data.password,10);
        result = await user.updateOne({password:np});
        }
    


        const nuser=await User.findOne({_id:decoded._id})
       
        
        res.status(201).send(nuser)



        
      

       
       


       


      
        
    } catch (error) {
        res.status(201).status({error: error.message});
    }
}

     