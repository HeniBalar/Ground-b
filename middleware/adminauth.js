const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin")
const dotenv = require("dotenv");
dotenv.config({path:"config/.env"})


exports.adminauth = async (req, res, next) => {
    try{

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
        let admin;
        admin = await Admin.findOne({_id:decoded._id, 'tokens.token': token})
        if(!admin){
            admin = await Member.findOne({_id:decoded._id, 'tokens.token': token})
            if(!admin){
                throw new Error()
            }
        }

        req.token = token
        req.admin = admin
        
        next()
        
    }catch(e){
        res.status(401).send({error: "Please authenticate admin...!!!"})
    }
}