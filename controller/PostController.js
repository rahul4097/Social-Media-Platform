const postModel = require('../models/UserPost');
const  authModel = require('../models/userLogin');

const createPost = async (req , res)=>{
    const{userName,content , description , like , comment} = req.body;
    try {
        const checkUser = await authModel.findOne({userName : userName});
        if(!checkUser){
            return res.status(400).send(`there is no register user for ${userName}`)
        }
        const data = await postModel.create({
            userName : userName,
            content : content,
            description : description,
            like : like,
            comment : comment
        })

        res.status(201).send(data);
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
        const postId = req.params.id;
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
 


module.exports = {createPost , viewPost, updatePost, deletePost, likePost, commentPost}