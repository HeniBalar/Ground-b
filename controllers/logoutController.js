const User =  require('../models/User')

exports.logout = async(req,res) =>{
    try{
        const updated_tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        if(updated_tokens.length===0){
            await User.findOneAndUpdate({_id: req.user._id},{tokens: updated_tokens, status:"Inactive"})
        }else{
            await User.findOneAndUpdate({_id: req.user._id},{tokens: updated_tokens, status:"Active"})
        }
        
        res.sendStatus(200)
    }catch(error){
        res.send({error: error.message})
    } 
}

exports.logoutAll = async(req,res) =>{
    try{
        await User.findOneAndUpdate({_id: req.user._id},{tokens: [],status:"Inactive"}) 
        res.sendStatus(200)
    }catch(error){
        res.send({error: error.message})
    }   
}