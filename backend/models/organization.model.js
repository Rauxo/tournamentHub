const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    orgName:{
        type:String,
        required: true
    },
    orgMail:{
        type:String,
        required: true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    location:{
        type:String,
       required: true
    },
    password:{
        type:String,
       required: true
    }

},{timestamps:true});

module.exports = mongoose.model("Organization",OrganizationSchema);

