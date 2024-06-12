const Admin = require("../../models/Admin")
const cloudinary = require("../../utils/cloudinary")
const admin  = require("../../utils/firebase")
// const { translate } = require("../../utils/translate")
// const LanguageDetect = require('languagedetect');
// const lngDetector = new LanguageDetect();
// lngDetector.setLanguageType("iso2")
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const dotenv = require("dotenv");
const AdminNotification = require("../../models/AdminNotification");
const Ground = require("../../models/Ground")
dotenv.config({path:"config/config.env"})

exports.addGround = async(req, res) => {

    try{
        if(req.user.usertype==="owner"){

            // changes in add ground api (add price and unit price and the option to add multiple prices)

            let data = req.body
            // const lang = process.env.LANGUAGE
           
            let p_array = [] //this will store objects of urls of photos
            for (let index = 0; index < req.files.length; index++) {
                const element = req.files[index].path;
                //element - C:\Users\01\AppData\Local\Temp\default-ground.png
                // console.log(element);
                const image = await cloudinary.uploader.upload(element,{folder: 'groundphotos'})
                const photo = {photoid: image.public_id, photourl: image.secure_url, photothumbnail: image.secure_url.replace("/image/upload","/image/upload/c_limit,w_350,h_200")}
                p_array.push(photo)
                await unlinkAsync(element)
            }

            // if(lang==='ar'){
            //     for(let i in data){
            //         if(i!=='price' && i!=='starttime' && i!=='endtime' && i!=="photos"){
            //             if(lngDetector.detect(data[i],1)[0][0]=="ar"){
            //                 data[i] = await translate.translate(data[i],'en')
            //             }
            //         }
            //     }
            // }

            // let sp = []
            // s = req.body.sport_type.replace("[","")
            // s = s.replace("]","")
            // let sportsarray = s.split(",") 
            // console.log("req.body.sport_type...",req.body.sport_type)
            // console.log(typeof(req.body.sport_type))
            // const s = String(req.body.sport_type)
            // console.log("conv..",s)
            // console.log("....",typeof(s))
            // let ts = [];
            // req.body.sport_type.forEach(element => {
            //     ts.push(element)
            // });
            // console.log("ts..",ts)

            let sp = []
            let sport= req.body.sport_type
            
            for (let i = 1; i < sport.length; i++) {
                const s = sport[i];
                if(s=='"'){
                    let j=i+1;
                    let tmp="";
                    while(sport[j]!=='"'){
                        tmp+=sport[j];
                        j++;
                    }
                    i=j;
                    sp.push(tmp);
                }
            }


            let fc = []
            let facility= req.body.facilities
            
            for (let i = 1; i < facility.length; i++) {
                const f = facility[i];
                if(f=='"'){
                    let j=i+1;
                    let tmp="";
                    while(facility[j]!=='"'){
                        tmp+=facility[j];
                        j++;
                    }
                    i=j;
                    fc.push(tmp);
                }
            }
            console.log(fc);

            // let pricearr = []
            // let price= req.body.price
            
            // for (let i = 1; i < price.length; i++) {
            //     const s = price[i];
            //     if(s=='"'){
            //         let j=i+1;
            //         let tmp="";
            //         while(price[j]!=='"'){
            //             tmp+=price[j];
            //             j++;
            //         }
            //         i=j;
            //         pricearr.push(tmp);
            //     }
            // }
            
            // console.log(pricearr);
          
                
           
            // console.log("sp..",sp)

            let temp = {
                ...data,
                // price:pricearr,
                sport_type: sp,
                facilities: fc,
                ownerid: req.user._id,
                photos: p_array
            }

            const newGround = new Ground(temp)
            console.log("newGround",newGround)
            await newGround.save()

            no_data = {
                sender: req.user, 
                ground: newGround,
                message: `Owner ${req.user.name} sent you ground verification message`,
            }

            // const g = new Ground(temp)
            // await g.save()
            // res.status(201).send(g)

            const m = new AdminNotification({data: no_data, createdat: new Date()})
            await m.save()
        
            if(m){
                await Admin.updateMany({},{$inc: {'pendingapprovals' :1}})
                res.status(201).send(newGround)
            }

        }else{
            throw new Error("Only owners are allowed to perform this action")
        }

    }catch(error){
        console.log("error.message...",error.message)
        res.send({error: error.message})
    }
}