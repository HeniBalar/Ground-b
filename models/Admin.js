const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"});

const adminSchema = new mongoose.Schema({

    name:{
        type: String,
        validate(value) {
            if (!validator.isLength(value,{min:3})) {
              throw new Error("Name should have atleast 3 characters");
            }
          }
    },
    mobile:{
        type: String,
        validate(value) {
            if(!validator.isNumeric(value)){
                throw new Error("Mobile No should have only numeric characters");     
            }else if(!validator.isLength(value, {min: 10,max:10})){
                throw new Error("Mobile No should have only 10 characters"); 
            }
        }
    },
    email:{
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Enter a valid email address");
            }
        }
    },
    password:{
        type: String
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
    tokens: [{
        token: {
            type:String,
            required: true
        }
    }],
    fcmtoken: {
        type : String
    },
    lasttimeloggedin:{
        type: Date
    },
    lasttimeloggedout:{
        type: Date
    },
    pendingapprovals:{
        typr: Number,
        default: 0
    }
})


adminSchema.pre('save', async function(next) {
    const admin = this

    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password,8)
    }

    next()
})


adminSchema.methods.generateAuthToken = async function() {
    const admin = this
    const token = jwt.sign({_id: admin._id.toString()}, process.env.ADMIN_JWT_SECRET)

    // admin.tokens = admin.tokens.concat({token})
    // admin.lasttimeloggedin = new Date()

    admin.tokens = { token }
    admin.lasttimeloggedin = new Date()

    await admin.save()

    return token
}

adminSchema.statics.findByCredentials = async(email, password) => {
    const admin = await Admin.findOne({email})
    if(!admin){
        throw new Error('There is no account with given email address. Please register first to login !')
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if(!isMatch){
        throw new Error("The entered password is incorrect")
    }
    return admin
}

adminSchema.statics.checkAdmin = async(data) =>{
    const admin = await Admin.findOne({email: data})
    return admin ? true : false
}

const Admin = mongoose.model('Admin',adminSchema)

module.exports = Admin
