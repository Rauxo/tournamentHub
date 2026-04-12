const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    orgName:{
        type:String,
        require:true,
    },
    orgMail:{
        type:String,
        require:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    location:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

},{timestamps:true});

module.exports = mongoose.model("Organization",OrganizationSchema);

