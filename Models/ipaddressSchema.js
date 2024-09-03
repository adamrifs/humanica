const mongoose = require('mongoose')

const ipSchema = new mongoose.Schema({

    ip: { type: String, required: true },
    date: { type: Date, required: true },
    country: { type: String, required: true } 
})

const ipaddress = mongoose.model('ipaddress', ipSchema)

module.exports = ipaddress