const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phnNumber : {
        type : Number,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
}, {timestemp : true});

module.exports = mongoose.model('UserDetails' , userSchema)

