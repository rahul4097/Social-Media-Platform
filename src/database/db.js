const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DATA_BASE)
.then(()=>{
    console.log('The dataBase has been connect')
}).catch((error)=>{
    console.log(error)
})

// module.exports = mongoose;