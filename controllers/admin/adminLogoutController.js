const Admin = require('../../models/Admin')

// exports.adminLogout = async(req,res) =>{
//     try{
//         const updated_tokens = req.admin.tokens.filter((token) => {
//             return token.token !== req.token
//         })
//         await Admin.findByIdAndUpdate({_id: req.admin._id},{tokens: updated_tokens, lasttimeloggedout: new Date()})    
//         res.sendStatus(200)
//     }catch(error){
//         res.send({error: error.message})
//     } 
// }

exports.logoutAll = async(req,res) =>{
    try{
        await Admin.findByIdAndUpdate({_id: req.admin._id},{tokens: [], lasttimeloggedout: new Date()})
        res.sendStatus(200)
    }catch(error){
        res.send({error: error.message})
    }   
}