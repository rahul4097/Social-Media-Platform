const express = require('express');
const router = express.Router();

const { CreateProfile, updateProfile, viewProfile, follower, unFollow, search, viewProfileDashboard, createProfileDashboard, viewIndivisual, updateProfileDetails, deleteProfile, viewAll } = require('../controller/ProfileController');

router.get('/' ,viewProfileDashboard)

router.get('/createProfile' , createProfileDashboard )
router.post('/createProfile' , CreateProfile)

router.get('/viewAllProfile/:id', viewAll)


router.get('/viewProfile/:id', viewIndivisual)



router.get('/editProfile/:id', updateProfile)
router.post('/editprofile/:id' , updateProfileDetails)


// router.get('/viewprofile', viewProfile)

router.put('/follow/:id',follower)
router.put('/unfollow/:id',unFollow)
router.get('/search', search)

router.delete('/editProfile/:id',deleteProfile);
// router.post('/search',);



module.exports = router
