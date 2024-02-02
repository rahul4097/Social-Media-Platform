const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userName :{
        type : String,
        required : true,
        unique : true,
        min : 3,
        max : 15
    },
    content : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    like : {
        type : Array,
        default : []
    },
    comment : {
        type : Array,
        default : []
    },
 
}, {timestemp : true});

module.exports = mongoose.model('post_Details' , PostSchema)