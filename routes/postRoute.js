const express = require('express');
const router = express.Router();

const { createPost, viewPost, updatePost, deletePost, likePost, commentPost, viewPostDashboard, createPostDashboard, viewIndivisualPost, updatePosts, updatePostDetails, deletePosts, } = require('../controller/PostController');

router.get('/' ,viewPostDashboard)
router.get('/createPost' , createPostDashboard )
router.post('/createPost' ,createPost);

router.get('/viewPost/:id', viewIndivisualPost)

router.get('/editPost/:id', updatePosts)
router.put('/editPost/:id' , updatePostDetails)

router.delete('/editPost/:id',deletePosts);

// router.get('/viewPost/:id',viewPost);
// router.put('/updatePost/:id', updatePost);

// router.delete('/deletePost/:id',deletePost )
// router.put('/likePost/:id',likePost)
// router.put('/commentPost/:id',commentPost)


module.exports = router;