const User = require("../../models/User");
const Ground = require("../../models/Ground")

exports.addWishList = async(req,res) => {
    const userId = req.user._id;
    const groundId = req.body.ground_id;
    try {
        let user = await User.findById(userId)
        let isExist = user.wishlist.find((i) => i.ground_id.toString() === groundId)
        
        if (isExist) {
            user = await User.findByIdAndUpdate(
                userId,
                { $pull: { wishlist: { ground_id : groundId }} },
                { new: true }
            );
            res.status(201).send({ message: "remove the ground from wishlist",});
        } else {
            user = await User.findByIdAndUpdate(
                userId,
                { $push: { wishlist: { ground_id : groundId }} },
                { new: true }
            );
            res.status(201).send({ message: "add the ground in wishlist",});
        }
    } catch(error) {
        res.send({error: error.message})
    }
}

exports.removeWishList = async(req,res) => {
    const userId = req.user._id;
    const groundId = req.body.ground_id;
    try {
        let user = await User.findById(userId)
        let isExist = user.wishlist.find((i) => i.ground_id.toString() === groundId)
        
        if (!isExist) {
            res.status(405).send({message:"ground not exists in the wishlist"})
        } else {
            user = await User.findByIdAndUpdate(
                userId,
                { $pull: { wishlist: { ground_id : groundId }} },
                { new: true }
            );
            res.status(201).send({ message: "remove the ground from wishlist"});
        }
    } catch (error) {
        res.send({error: error.message})
    }
}

exports.getAllWishList = async(req,res) => {
    try {
        const userId = req.user._id;
        let user = await User.findById(userId)
        const groundIds = user.wishlist.map(item => item.ground_id);
        
        if (groundIds.length > 0) {
        const totalGrounds = await Ground.find({ _id: { $in: groundIds } });
        let final=[]
        for(let i=0;i<totalGrounds.length;i++){
            let tmp={
                _id:totalGrounds[i]._id,
                groundname:totalGrounds[i].groundname,
                location:totalGrounds[i].location,
                rating:totalGrounds[i].rating,
                photos:totalGrounds[i].photos,
                status:totalGrounds[i].status,
                price:totalGrounds[i].price,
            }
            final.push(tmp);
        }
        res.status(201).send(final)
        } else {
            res.status(401).send({ message: "not available ground in wishlist for this user"});
        }

    } catch (error) {
        res.send({error: error.message})
    }
}