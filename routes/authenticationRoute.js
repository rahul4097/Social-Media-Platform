const express = require('express');
const router = express.Router();

const {signup , login} = require('../controller/UserAuthenticationController');

router.post('/signup' , signup )
router.post('/login' , login )
// router.post('/users/signup', async (req , res)=>{
//     // res.render('signup')
//     const user = new userModel(req.body);
//     await user.save();
//     res.send("data saved;");

// })


module.exports = router;