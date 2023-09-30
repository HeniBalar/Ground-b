const mongoose = require('mongoose');

const groundSchema = new mongoose.Schema({

    groundname:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    ownername:{
        type: String,
        required: true
    },
    ownerid:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    starttime:{
        type: String,
        required: true
    },
    endtime:{
        type: String,
        required: true
    },
    price:[{
        type: String,
        required: true
    }],
    address:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        default: 0
    },
    photos: [{
        photoid:{
          type: String,
        },
        photourl:{
          type: String,
        },
        photothumbnail:{
          type: String,
        }
    }],
    nooftimebooked:{
        type: Number,
        default: 0
    },
    createdat:{
        type: Date,
        default: new Date()
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, ref:'Review'
    }],
    status:{
        type: String,
        default: "Pending"
    },
    sport_type:[{
        type: String
    }],
    facilities:[{
        type: String
    }]
})


groundSchema.methods.addReview = async function(id) {

    const ground = this

    let t = ground.reviews ? ground.reviews : []
    t.push(id)

    ground.reviews = t
    await ground.save()
    
    return ground
}


const Ground = mongoose.model('Ground',groundSchema)

module.exports = Ground