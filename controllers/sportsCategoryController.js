const Sports = require("../models/Sports")


exports.getSportsCategory = async(req,res) =>{
    try{
        
        const sports = await Sports.find({})
        res.status(200).send({sports})

    }catch(error){
        res.send({error: error.message})
    }   
}