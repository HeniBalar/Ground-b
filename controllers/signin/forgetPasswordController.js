const User = require("../../models/User");
const bcrypt=require('bcryptjs')

// exports.forgotPassword = async(req,res) => {
//     try {
//         const u = await User.getUserInfo(req.body.email);
//         const isMatch = await bcrypt.compare(req.body.password, u.password);
//         if (isMatch) {
//             throw new Error("Old password & Current password can't be same")
//         }
//         const user = await User.findOneAndUpdate({_id: u._id},{password: await bcrypt.hash(req.body.password, 8)},{returnDocument: 'after'})
//         await user.save()
//         res.status(200).send({message: "Your password was successfully reset"})
//     } catch (error) {
//         res.send({error: error.message})
//     }
// }

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const u = await User.findOne({ email })
        // console.log("finduser===>>>", u)
        if(!u){
            return res.status(404).send({message: "User not found with this email address!"})
        }
        const user = await User.findByIdAndUpdate({ _id: u._id }, { $set: { password: await bcrypt.hash(req.body.password, 8) } }, { returnDocument: 'after' })
        user.save()
        return res.status(200).send({ message: "Update password successfully." })
    } catch (error) {
        console.error({ error: error })
        return res.status(500).send({ error: error.message })
    }
}