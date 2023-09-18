const Ground = require("../../models/Ground")
// const { translate } = require("../../utils/translate")
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

exports.getOwnedGrounds = async(req, res) => {
    try{

        if(req.user.usertype==="owner"){

            // const lang = process.env.LANGUAGE
            const grounds = await Ground.find({ownerid: req.user._id})
            if(grounds.length===0){
                throw new Error("No Grounds Found This Owner")
            }

            // if(lang=='ar'){
            //     for(let ground in grounds){
            //         for(let i in ground){
            //             if(i!=='_id' && i!=="rating" && i!=="photos"){
            //                 grounds[ground][i] = await translate.translate(grounds[ground][i],lang)
            //             }
            //         }
            //     }
            // }

            res.status(201).send(grounds)

        }else{
            throw new Error("Only owners are allowed to access this detail")
        }

    }catch(error){
        res.send({error: error.message})
    }
}