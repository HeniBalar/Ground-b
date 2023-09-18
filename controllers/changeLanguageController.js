const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"})

exports.changeLanguage = async(req, res) => {
    try{

        process.env["LANGUAGE"] = req.body.lang;
        res.status(200).send({lang: process.env.LANGUAGE})

    }catch(error){
        res.send({error: error.message})
    }
}