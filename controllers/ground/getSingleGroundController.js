const Ground = require("../../models/Ground")
// const { translate } = require("../../utils/translate")
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

exports.getSingleGround = async(req, res) => {
    try{

        // const lang = process.env.LANGUAGE
        const ground = await Ground.findById(req.params.id)
        if(!ground){
            throw new Error("Ground not found")
        }

        // if(lang==='ar'){
        //     for(let i in ground){
        //         if(i!=='_id' && i!=='starttime' && i!=='endtime' && i!=='price' && i!=='rating'){
        //             ground[i] = await translate.translate(ground[i],lang)
        //         }
        //     }
        // }

        res.status(201).send(ground)
    }catch(error){
        res.send({error: error.message})
    }
}