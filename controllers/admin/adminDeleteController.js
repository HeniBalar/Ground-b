const Ground = require("../../models/Ground")
const Review = require("../../models/Review")
const User = require("../../models/User")
const AdminNotification = require("../../models/AdminNotification")


exports.adminDeleteAccount = async(req,res) => {
    try{

        const account = await User.findOneAndDelete({_id: req.params.id},{new: true})

        if(account.profile.pid!=="groundphotos/defaultprofile/avatar_flf1xx"){
            await cloudinary.uploader.destroy(account.profile.pid)
        }

        if(account){

            if(account.usertype==="owner"){
                const grounds = await Ground.deleteMany({ownerid: account._id})
                for(let ground in grounds){
                    await Review.deleteMany({groundid: ground._id})
                    for(let i in ground.photos){
                        cloudinary.uploader.destroy(ground.photos[i].photoid);
                    }
                }
            }
            
        }else{
            throw new Error("Account not found !!")
        }

        data = {
            account: account,
            message: `${account.usertype.charAt(0).toUpperCase()}${account.usertype.slice(1)} ${account.name} has been deactivated`,
        }

        const m = new AdminNotification({data, createdat: new Date(), status: "delivered"})
        await m.save()

        res.sendStatus(200)

    }catch(error){
        res.send({error: error.message})
    }
}