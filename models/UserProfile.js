const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    about : {
        type : String,
        required : true
    },
    Intrest : {
        type : String,
        required : true
    },
    // imageUrl : {
    //     type : String,
    //     required : true
    // },
    country : {
        type : String,
        required : true
    }, createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    follower :{
        type : Array,
        default : [0]
    },
    following : {
        type : Array,
        default : [0]
    }
}, {timestemp : true});

module.exports = mongoose.model('profile_Details' , userSchema)