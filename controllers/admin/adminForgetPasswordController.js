const Admin = require("../../models/Admin")
const bcrypt=require('bcryptjs')

exports.forgotPassword = async(req,res) => {
    try {
        const u = await Admin.getAdminInfo(req.body.email);
        const isMatch = await bcrypt.compare(req.body.password, u.password);
        if (isMatch) {
            throw new Error("Old password & Current password can't be same")
        }
        const admin = await Admin.findOneAndUpdate({_id: u._id},{password: await bcrypt.hash(req.body.password, 8)},{returnDocument: 'after'})
        await admin.save()
        res.status(200).send({message: "Your password was successfully reset"})
    } catch (error) {
        res.send({error: error.message})
    }
}