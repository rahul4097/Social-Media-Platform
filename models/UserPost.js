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
        default : [0]
    },
    comment : {
        type : Array,
        default : [0]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
 
}, {timestemp : true});

module.exports = mongoose.model('post_Details' , PostSchema)