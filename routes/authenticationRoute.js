const express = require('express');
const router = express.Router();

const {signup , login, show, showlogin, showSignup, viewIndivisual, userEdit, editDetails, deleteUser, searchUser, logInPage, logedIN} = require('../controller/UserAuthenticationController');

// router.get('/' ,logInPage)
// router.post('/users',logedIN)

router.get('/',show)

router.get('/signup' , showSignup )
router.post('/signup' , signup )

router.get('/login' , showlogin )
// router.post('/login' , login )

router.get('/view/:id', viewIndivisual)

router.get('/edit/:id', userEdit)
router.put('/edit/:id', editDetails);

router.delete('/edit/:id',deleteUser);
router.post('/search',searchUser);




module.exports = router;