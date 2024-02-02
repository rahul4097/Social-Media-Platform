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
    },
    follower :{
        type : Array,
        default : []
    },
    following : {
        type : Array,
        default : []
    }
}, {timestemp : true});

module.exports = mongoose.model('profile_Details' , userSchema)