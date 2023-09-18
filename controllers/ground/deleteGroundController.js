const Ground = require("../../models/Ground")
const Review = require("../../models/Review")
const User = require("../../models/User")
const cloudinary = require("../../utils/cloudinary")

exports.deleteGround = async(req,res) => {
    try{

        if(req.user.usertype==="owner"){

            const ground = await Ground.findOneAndDelete({_id:req.params.id})
            if(ground){
                
                await User.findByIdAndUpdate({_id: req.user._id, noofownedgrounds : {$gte : 1}},{$inc: {'noofownedgrounds' : -1}})
                await Review.deleteMany({groundid: req.params.id})
                for(let i in ground.photos){
                    cloudinary.uploader.destroy(ground.photos[i].photoid);
                }

            }else{
                throw new Error("Ground not found !!")
            }

            res.sendStatus(200)

        }else{
            throw new Error("Only owners are allowed to perform this action")
        }

    }catch(error){
        res.send({error: error.message})
    }
}