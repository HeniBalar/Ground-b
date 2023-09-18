const AdminNotification = require("../../models/AdminNotification")
const { startOfDay, endOfDay } = require("date-fns")

exports.adminNotifications = async(req, res) => {
    try{

        var newDate = new Date();
        newDate.setMonth(newDate.getMonth() - 1);
        newDate.setHours(0, 0, 0, 0);
        
        var query = {createdat: {$gte: newDate}}
        const data = req.body
        // let q = []

        if(Object.keys(data).length!==0){
            if(data.date){
                let d = new Date(data.date)
                // console.log("startOfDay(d)...",moment(d).startOf('day'))
                // console.log("endOfDay(d)...",moment(d).endOf('day'))
                // q.push({createdat: { $gte: startOfDay(d), $lte: endOfDay(d)}})
                query = {createdat: { $gte: startOfDay(d), $lte: endOfDay(d)}}
            }
            // if(data.sports){
            //     q.push({review: { $regex : data.sports, $options: "i" }})
            // }

            // query = {$and: q}
        }
        const notifications = await AdminNotification.find(query).sort({'createdat' : 'desc'})
        res.status(201).send({notifications})

    }catch(error){
        res.send({error: error.message})
    }
}

// COMMENT CODE
// FOR QUERY NOTIFICATION BASED ON SPORTS