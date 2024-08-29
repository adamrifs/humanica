const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    workExp: [
        {
            company: String,
            title: String,
            location: String,
            startdate: Date,
            enddate: Date,
            description: String
        }
    ],
    education: [
        {
            degree: String,
            institution: String,
            startDate: Date,
            endDate: Date,
            description: String
        }
    ],
    skills: [
        {
            skill: { type: String, required: true },
            skilllevel: { type: Number, required: true }
        }
    ],
    language: [
        {
            language: { type: String, required: true },
            proficiency: { type: String, required: true }

        }
    ],
    certification: [
        {
            crname: { type: String },
            crdate: { type: Date },
            file: { type: String },
            description: { type: String }
        }
    ],
    reference: [
        {
            refname: { type: String, required: true },
            refphone: { type: Number, required: true },
            refemail: { type: String, required: true },
            refrelationship: { type: String }
        }
    ],

    drivinglicnse: {
        dlfile: { type: String }
    },
    socialid: { type: String },
    attachments: {
        file: { type: String }
    },

    industryexp: [{
        industrycategory: { type: String, required: true },
        industry: { type: String, required: true }
    }],

    placetowork: [{
        country: { type: String, required: true },
        region: { type: String },
        place: { type: String }
    }]
});

const admindetails = mongoose.model('admindetails', adminSchema);

module.exports = admindetails;