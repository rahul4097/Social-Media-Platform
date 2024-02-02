const express = require('express');
const router = express.Router();

const { CreateProfile, updateProfile, viewProfile, follower, unFollow, search } = require('../controller/ProfileController');

router.post('/createprofile' , CreateProfile)
router.put('/updateprofile/:id' , updateProfile)
router.get('/viewprofile', viewProfile)
router.put('/follow/:id',follower)
router.put('/unfollow/:id',unFollow)
router.get('/search', search)

module.exports = router
