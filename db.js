const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

const connectToMongo = () =>{
    mongoose.connect(process.env.DB_URI,()=>{
           console.log("Connected Successfully");
       })
}

module.exports = connectToMongo;