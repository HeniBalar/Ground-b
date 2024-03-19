const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"});
const jwt = require('jsonwebtoken');
const validator = require("validator");


const userSchema = new mongoose.Schema({

    socialid:{
        type: String,
    },
    first_name:{
        type: String,
        default: ""
    },
    last_name:{
        type: String,
        default: ""
    },
    mobile:{
        type: String,
        // validate(value) {
        //     if(!validator.isNumeric(value)){
        //         throw new Error("Mobile No should have only numeric characters");     
        //     }else if(!validator.isLength(value, {min: 10,max:10})){
        //         throw new Error("Mobile No should have only 10 characters"); 
        //     }
        // }
    },
    email:{
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Enter a valid email address");
            }
        }
    },
    profile: {
        pid:{
          type: String,
          default: "groundphotos/defaultprofile/avatar_flf1xx"
        },
        purl:{
          type: String,
          default: "https://res.cloudinary.com/karishma027/image/upload/v1657951309/groundphotos/defaultprofile/avatar_flf1xx.png"
        }
    },
    usertype:{
        type: String
    },
    fcmtoken:{
        type: String,
        default: null
    },
    noofbooking:{
        type: Number,
        default: 0
    },
    noofownedgrounds:{
        type: Number,
        default: 0
    },
    createdat:{
        type: Date,
        default: new Date()
    },
    tokens: [{
        token: {
            type:String,
            required: true
        }
    }],
    status:{
        type: String
    },
    wishlist: [{
        ground_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ground'
        }
    }],
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    user.status = "Active"
    await user.save()

    return token
}


const User = mongoose.model('User',userSchema)

module.exports = User
