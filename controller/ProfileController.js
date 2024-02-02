const profileModel = require('../models/UserProfile');
const authModel = require('../models/userLogin')


const CreateProfile = async (req , res)=>{
    const{userName ,fname,lname,about, Intrest,country, imageUrl} = req.body;
    try {
        const findUser = await authModel.findOne({userName : userName});
        if(!findUser){
            return res.status(400).send('This user is not exist');
        }
        const profileData= await profileModel.create({
            userName : userName,
            fname : fname,
            lname : lname,
            about : about,
            Intrest : Intrest,
            country : country,
        })
        res.status(201).json({user : profileData})
    } catch (error) {
        res.status(404).send('something went wrong')
        console.log(error);
    }
}

const updateProfile = async (req , res)=>{
    const {bio} = req.body;
try {
    const id = req.params.id;
    const findUser = await profileModel.findOne({_id : id});
    if(!findUser){
        return res.status(400).send('This user is not exist');
    }
    const updateUser = await profileModel.findByIdAndUpdate(id ,{
        bio
    });
    res.status(200).json({updateUser});    

} catch (error) {
    console.log(error);
    res.status(404).send('Something went wrong');
}
}


const viewProfile = async (req,res)=>{
    const{} = req.body;
    try {
        const users = await profileModel.find();
        if(users.length ==0){
            return res.status(400).send('There is no user in your dataBase!')
        }
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(404).send('Something went wrong!')
    }
}


const follower = async(req , res)=>{
    if(req.body.userId != req.params.id){
        try {
            const user = await profileModel.findById(req.params.id);
            const currentUser = await profileModel.findById(req.body.userId);
            if(!user.follower.includes(req.body.userId)){
                await user.updateOne({$push: {follower: req.body.userId}})
                await currentUser.updateOne({$push :{following :req.params.id}})
                res.status(201).json("you have been followed this user")
            }else{
                res.status(201).json("You have already followed this User")
            }
        } catch (error) {
            console.log(error);
            res.status(404).json("Something went wrong!")
        }
    }
}


const unFollow = async(req , res)=>{
    if(req.body.userId != req.params.id){
        try {
            const user = await profileModel.findById(req.params.id);
            const currentUser = await profileModel.findById(req.body.userId);
            if(user.follower.includes(req.body.userId)){
                await user.updateOne({$pull: {follower: req.body.userId}})
                await currentUser.updateOne({$pull :{following :req.params.id}})
                res.status(201).json("you have Unfollow this user")
            }else{
                res.status(201).json("You can't Unfollowed this User")
            }
        } catch (error) {
            console.log(error);
            res.status(404).json("Something went wrong!")
        }
    }
}

const search = async(req,res)=>{
    try {
        const user = await profileModel.findOne({userName : req.body.userName})
        if(!user){
            return res.status(400).json("Invalid userName!")
        }
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json("Something went wrong!")
    }
}

module.exports = {CreateProfile , updateProfile , viewProfile, follower, unFollow, search}