const express = require('express');
const router = express.Router();

const { createPost, viewPost, updatePost, deletePost, likePost, commentPost, } = require('../controller/PostController');

router.post('/createPost' ,createPost);
router.get('/viewPost/:id',viewPost);
router.put('/updatePost/:id', updatePost);
router.delete('/deletePost/:id',deletePost )
router.put('/likePost/:id',likePost)
router.put('/commentPost/:id',commentPost)


module.exports = router;