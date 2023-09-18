// const { translate } = require("../../utils/translate")
const Ground = require("../../models/Ground")
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

function findData(data) {

    let q = [{"status": "approved"}]

    if(data.sports.length!==0){
        let sp = []
        let s = data.sports.replace("[","")
        s = s.replace("]","")
        let sportsarray = s.split(",") 

        sportsarray.forEach(element => {
            let tsp = {
                $regex: element,
                $options: "i"
            }
            sp.push({"description": tsp})
        });
        q.push({$or: sp})
    }
    if(data.country.length!==0){
        q.push({"country" : data.country})
    }
    if(data.state.length!==0){
        q.push({"state" : data.state})
    }
    if(data.location.length!==0){
        let l = []
        let d = data.location.replace("[","")
        d = d.replace("]","")

        locationarray = d.split(",")
        locationarray.forEach(element => {
            l.push({"location": { $regex : element, $options: "i" }})
        });
        q.push({$or: l})
    }
    if(data.price.length!==0){
        q.push({"price": data.price})
    }
    if(data.rating.length!==0){
        q.push({"rating": data.rating})
    }
    console.log(q);
    return q
}

exports.getGrounds = async(req, res) => {
    try{
        // const lang = process.env.LANGUAGE
        let data = req.body
        
        let query = {$or:[{"status": "approved"},{"status": "Pending"}]}

        if(Object.keys(data).length!==0){
            // if(lang=='ar'){
            //     for(let i in data){
            //         if(i!=='price' && i!=='rating'){
            //             data[i] = await translate.translate(data[i],'en')
            //         }
            //     }
            // }
            let temp = findData(data)
            query = {$and : temp}
        }

        let grounds = await Ground.find(query).select("groundname location rating photos").sort({"rating":"asc"});
        let g1=await Ground.find();
       
         if(!g1){
            throw new Error("No record found for this filter combination!")
        }
        

        // if(!grounds){
        //     throw new Error("No record found for this filter combination!")
        // }

        // if(lang=='ar'){
        //     for(let ground in grounds){
        //         for(let i in ground){
        //             if(i!=='_id' && i!=="rating" && i!=="photos"){
        //                 grounds[ground][i] = await translate.translate(grounds[ground][i],lang)
        //             }
        //         }
        //     }
        // }

        let final=[]
        for(let i=0;i<g1.length;i++){
            let tmp={
                _id:g1[i]._id,
                groundname:g1[i].groundname,
                location:g1[i].location,
                rating:g1[i].rating,
                photos:g1[i].photos,
                status:g1[i].status,
            }
            final.push(tmp);
        }
        // console.log(final);
        

        res.status(201).send(final)

    }catch(error){
        res.send({error: error.message})
    }
}



// {
//     $and:[
//         {$or: [
//             {description: { $regex: "Cricket", $options: "i" } },
//         ]},
//         {address: { $regex: "Add", $options: "i"}},
//         {address: { $regex: "ss 1", $options: "i" }},
//         {$or: [
//              {location: "Katargam"},
//         ]},
//         {price: 10000},
//         {rating: 5}
//     ]
// }

// data = {
//     "sports": ["cricket"],
//     "country": "India",
//     "state": "Gujarat",
//     "location": ["Katargam"],
//     "price": 10000,
//     "rating": 5
// }