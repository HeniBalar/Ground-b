const Review = require("../../models/Review")
const { startOfDay, endOfDay } = require("date-fns")

exports.adminRandR = async(req, res) => {
    try{

        let query = {}
        const data = req.body
        let q = []

        if(Object.keys(data).length!==0){
            if(data.date){
                let d = new Date(data.date)
                // console.log("startOfDay(d)...",moment(d).startOf('day'))
                q.push({createdat: { $gte: startOfDay(d), $lte: endOfDay(d)}})
            }
            if(data.sports){
                q.push({review: { $regex : data.sports, $options: "i" }})
            }
            query = {$and: q}
        }

        const reviews = await Review.find(query)
                            .populate("userid","name profile")
                            .populate("groundid", "groundname ownername description starttime endtime nooftimebooked")
                            .select("rate review createdat")

        // TO FIND SPORTS IN GROUND DESCRIPTION
        // const reviews = result.filter((review)=>{
        //     const t = review.groundid.description.toLowerCase()
        //     return t.includes("Football".toLowerCase())
        // })

        res.status(201).send({reviews})
        console.log("QQ",reviews)

    }catch(error){
        res.send({error: error.message})
    }
}