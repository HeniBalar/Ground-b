
const Ground = require("../../models/Ground")
const Review = require("../../models/Review")
// const { translate } = require("../../utils/translate")
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

exports.getOwnerGroundDetail = async(req, res) => {
    try{

        const gid = req.params.id
        // const lang = process.env.LANGUAGE

        const ground = await Ground.findOne({_id:gid}).populate({
            path: 'reviews',
            select: 'rate review location createdat',
            populate: {path: 'userid', select: 'name profile'}
        }).select('groundname rating description photos status')
        if(ground.length===0){
            throw new Error("No record found for this ground.")
        }

        // if(lang==='ar'){
        //     for(let i in ground){
        //         if(i!=='_id' && i!=='starttime' && i!=='endtime' && i!=='price' && i!=='rating' && i!=='photos'){
        //             ground[i] = await translate.translate(ground[i],lang)
        //         }
        //     }
        //     for(let review in reviews){
        //         for(let i in review){
        //             if(i!=='_id' && i!=="rate" && i!=='time'){
        //                     if(i==="userid"){
        //                         reviews[review][i]["name"] = await translate.translate(reviews[review][i]["name"],lang)
        //                     }
        //                 reviews[review][i] = await translate.translate(reviews[review][i],lang)
        //             }
        //         }
        //     }
        // }

        res.status(201).send(ground)

    }catch(error){
        res.send({error: error.message})
    }
}