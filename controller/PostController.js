const postModel = require('../models/UserPost');
const  authModel = require('../models/userLogin');



const viewPostDashboard = async(req,res) =>{
    const locals = {
        title: 'User Post',
        description:'library Management System'
    }
    try {
        const myPost = await postModel.find({});
        res.render("post" , {myPost , locals})
    } catch (error) {
        console.log(error)
    }
}


const createPostDashboard=async(req,res)=>{
    const myPost = await postModel.find({});

    const locals = {
        title: 'Add New Post',
        description:'Library Management System'
    }
    res.render('post/createPost',{myPost, locals});
}


const createPost = async (req , res)=>{
    const {userName,content , description , like , comment} = req.body;
    try {
        const checkUser = await authModel.findOne({userName : userName});
        if(!checkUser){
            // res.redirect('/profile')
            // return res.status(400).send(`there is no register user for ${userName}`)
            res.status(400).send(alert('this user is not register in your data base!!'))
        }
        const data = await postModel.create({
            userName : userName,
            content : content,
            description : description,
            like : like,
            comment : comment
        })
        res.redirect('/post')
        // res.status(201).send(data);
    } catch (error) {
        console.log(error);
        res.status(404).send('Something went wrong!');
    }
}


const viewPost = async (req, res)=>{
    try {
        const id = req.params.id;
        const findUser = await postModel.findById (id);
        if(findUser.length == 0 ){
            return res.status(400).send('There is no post');
        }
        res.status(201).send(findUser);
    } catch (error) {
        console.log(error);
        res.status(404).send('Something went wrong!');
    }
}


const updatePost = async (req , res)=>{
    const{content , description} = req.body;
    try {
        const id = req.params.id;
        const findUser = await postModel.findOne({_id : id});
        if(!findUser){
            return res.status(400).send("User not found");
        }
        const postUpdate = await postModel.findByIdAndUpdate(id , {
            content,
            description
        })
        res.status(201).send(postUpdate);
    } catch (error) {
        console.log(error);
        res.status(404).send('Something went wrong!');
    }
}

const deletePost = async(req,res)=>{
    try {
        // const findPost = await postModel.findByIdAndRemove(id);
        const findPost = await postModel.findOneAndDelete(req.params.id);

        if(!findPost ){
            return res.status(400).send(`There is no post ${findPost}`);
        }
        res.status(201).json({message : "The post has been deleted"});
    } catch (error) {
        console.log(error);
        res.status(404).send('Something went wrong!');
    }
}

const likePost = async (req , res)=>{
    if(req.body.userId != req.params.id){
        try {
            const user = await postModel.findById(req.params.id);
            if(!user.like.includes(req.body.userId)){
                await user.updateOne({$push: {like:req.body.userId}})
                res.status(201).json('user has been liked')
            }else{
                await user.updateOne({$pull :{like: req.body.userId}})
                res.status(404).json('you have Unliked this post')
            }
        } catch (error) {
            console.log(error);
            res.status(404).json("Something went wrong!")
        }
    }
}

const commentPost = async (req , res)=>{
    if(req.body.userId != req.params.id){
        try {
            const user = await postModel.findById(req.params.id);
            if(!user.comment.includes(req.body.userId)){
                await user.updateOne({$push: {comment:req.body.userId}})
                res.status(201).json('user has comment on your post')
            }else{
                res.status(404).json('you already comment on this post')
            }
        } catch (error) {
            console.log(error);
            res.status(404).json("Something went wrong!")
        }
    }
}
 
const viewIndivisualPost = async(req,res)=>{
    try {
        const allUsers = await authModel.find({})
        const userPost = await postModel.findOne({ _id: req.params.id })
        
        const locals = {
            title:'View User Profile',
            description: "Social Media Platform",
        };
        res.render('Post/viewPost',{
            locals,
            userPost,
            allUsers
        });
    } catch (error) {
        console.log(error);
        
    }
}

const updatePosts = async(req,res)=>{
    try {
        const postEdit = await postModel.findOne({ _id: req.params.id })
        
        const locals = {
            title:'Edit user Post',
            description: "Library management System",
        };
        res.render('Post/editPost',{
            locals,
            postEdit
        });
    } catch (error) {
        console.log(error);
        
    }
}

const updatePostDetails = async(req,res)=>{
    try {
        await postModel.findByIdAndUpdate(req.params.id,{
            content: req.body.content,
            description: req.body.description,
            updatedAt: Date.now()
        });

    //    await res.redirect(`/editUser/${req.params.id}`);
    res.redirect("/post")

    } catch (error) {
        console.log(error);
    }
}

const deletePosts = async(req,res)=>{
    try {
        const findPost = await postModel.deleteOne({_id : req.params.id});

        if(!findPost ){
            // return res.status(400).send(`There is no post ${findPost}`);
            res.alert("there is no match user from your data base");

        }
        res.redirect('/post')
    } catch (error) {
        console.log(error);
        res.status(404).send('Something went wrong!');
    }
}

module.exports = {createPost , viewPost, updatePost, deletePost, likePost, commentPost,viewPostDashboard,createPost, createPostDashboard,viewIndivisualPost,updatePosts,updatePostDetails, deletePosts}