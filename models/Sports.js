const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({

    type:{
        type: String
    },
    photo:{
        purl: {type: String},
        pid: {type: String}
    }
})

const Sports = mongoose.model('Sports', sportsSchema)

module.exports = Sports