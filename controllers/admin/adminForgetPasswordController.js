const Admin = require("../../models/Admin")
const bcrypt=require('bcryptjs')

// exports.forgotPassword = async(req,res) => {
//     try {
//         const u = await Admin.getAdminInfo(req.body.email);
//         const isMatch = await bcrypt.compare(req.body.password, u.password);
//         if (isMatch) {
//             throw new Error("Old password & Current password can't be same")
//         }
//         const admin = await Admin.findOneAndUpdate({_id: u._id},{password: await bcrypt.hash(req.body.password, 8)},{returnDocument: 'after'})
//         await admin.save()
//         res.status(200).send({message: "Your password was successfully reset"})
//     } catch (error) {
//         res.send({error: error.message})
//     }
// }

exports.adminForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const u = await Admin.findOne({ email })
        // console.log("finduser===>>>", u)
        if(!u){
            return res.status(404).send({message: "User not found with this email address!"})
        }
        const admin = await Admin.findByIdAndUpdate({ _id: u._id }, { $set: { password: await bcrypt.hash(req.body.password, 8) } }, { returnDocument: 'after' })
        admin.save()
        return res.status(200).send({ message: "Update password successfully." })
    } catch (error) {
        console.error({ error: error })
        return res.status(500).send({ error: error.message })
    }
}

