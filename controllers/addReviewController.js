const Ground = require("../models/Ground")
const Review = require("../models/Review")
// const { translate } = require("../../utils/translate")
// const LanguageDetect = require('languagedetect');
// const lngDetector = new LanguageDetect();
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

exports.addReview = async(req, res) => {
    try{

        if(req.user.usertype==="user"){

            // const lang = process.env.LANGUAGE
            let data = req.body
            data = {
                ...data,
                userid: req.user._id
            }

            // if(lang==="ar"){
            //     for(let i in data){
            //         if(i==="review" || i==="location"){
            //             if(lngDetector.detect(data[i],1)[0][0]=="ar"){
            //                 data[i] = await translate.translate(data[i],'en')
            //             }
            //         }
            //     }
            // }

            const gid = data.groundid
            const g = await Ground.findById(gid)

            if(!g){
                throw new Error("Ground not Found !")
            }

            const r = new Review(data)
            await r.save()
            
            // let newrating = g.rating==="0" ? data.rate : (Number(data.rate)+Number(g.rating))/2
            // newrating = parseFloat(newrating.toFixed(1))

            const currentRating = parseFloat(g.rating) || 0;
            const newRate = parseFloat(data.rate);

            let newrating = currentRating === 0 ? newRate : (newRate + currentRating) / 2;
            newrating = parseFloat(newrating.toFixed(1));

            const ground = await Ground.findByIdAndUpdate(gid,{rating: newrating},{new:true})
            await ground.addReview(r._id)

            // if(lang==="ar"){
            //     for(let i in data){
            //         if(i==="review" || i==="location"){
            //             data[i] = await translate.translate(data[i],lang)
            //         }
            //     }
            // }

            res.status(201).send(r)

        }else{
            throw new Error("Only users are allowed to persorm this action")
        }

    }catch(error){
        res.send({error: error.message})
    }
}