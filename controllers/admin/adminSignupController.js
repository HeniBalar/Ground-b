const Admin = require("../../models/Admin");

exports.adminSignup = async(req, res) => {
    try{
        const checkAdmin = await Admin.checkAdmin(req.body.email);
        if(checkAdmin){
            throw new Error("Admin with this email already exist. Please use different one !!")
        }
        const admin = new Admin(req.body)
        await admin.save()
        console.log("createad admin",admin)
        res.status(201).send({admin})

    }catch(error){
        res.send({error: error.message})
    }
}

