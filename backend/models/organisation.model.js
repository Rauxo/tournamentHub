const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const OrganisationSchema = new Schema({
    orgName:{
        type: String,
        required: true,
    },
    orgMail:{
        type:String,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, { timestamps: true });

const Organizations = mongoose.model("Organizations", OrganisationSchema);

module.exports = Organizations;