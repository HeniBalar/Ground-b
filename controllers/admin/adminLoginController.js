const Admin = require("../../models/Admin")

exports.adminLogin = async(req, res) => {
    try{

        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.status(201).send({admin, token})  

    }catch(error){
        res.send({error: error.message})
    }
}