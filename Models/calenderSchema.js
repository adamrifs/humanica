const mongoose = require('mongoose')

const calenderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['availability', 'vacation'],
        required: true
    },
    fromTime: {
        type: String,
        required: function() { return this.type === 'availability'; }
    },
    toTime: {
        type: String,
        required: function() { return this.type === 'availability'; }
    },
    fromDate: {
        type: Date,
        required: function() { return this.type === 'vacation'; }
    },
    toDate: {
        type: Date,
        required: function() { return this.type === 'vacation'; }
    },
    available: {
        type: Boolean,
        required: function() { return this.type === 'availability'; }
    },
    notes: {
        type: String,
        required: true
    }
});

const calender = mongoose.model('calender', calenderSchema)

module.exports = calender;
