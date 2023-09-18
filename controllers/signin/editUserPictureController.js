

const User = require("../../models/User");
const jwt=require("jsonwebtoken")
const cloudinary = require("../../utils/cloudinary")
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

exports.editUserPicture = async(req,res) => {
    try{

         console.log("req.file.path...",req.file)
         const profile_image = await cloudinary.uploader.upload(req.file.path)
        //  console.log("profile_image..",profile_image)

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
       
        const user=await User.findOne({_id:decoded._id})

         const photo = {pid: profile_image.public_id, purl: profile_image.secure_url}
         await unlinkAsync(req.file.path)
         
         let m;
         
         if(user.profile.pid === "default/default-ground_im3wp4" && req.user.profile.pid !== null){
             m = await User.findByIdAndUpdate({_id: user._id},{profile: photo},{new: true}).select('name mobile email profile')
         }else{
             if(user.profile.pid !== null){
                 await cloudinary.uploader.destroy(user.profile.pid)
             }
             m = await User.findByIdAndUpdate({_id: user._id},{profile: photo},{new: true}).select('name mobile email profile')
         }
 
         res.status(201).send(m)


    }catch(error){
        res.send({error: error.message})
    }
}

