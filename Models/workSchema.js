const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    fromTime:{
        type:String,
        required:true
    },
    toTime:{
        type:String,
        required:true
    },
    breakTime:{
        type:String
    },
    notes:{
        type:String
    }
});

const work = mongoose.model('work',workSchema)

module.exports = work 