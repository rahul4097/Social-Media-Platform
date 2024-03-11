const profileModel = require('../models/UserProfile');
const authModel = require('../models/userLogin')


const viewProfileDashboard = async(req,res) =>{
    const locals = {
        title: 'Social Media',
        description:'library Management System'
    }
    try {
        const myProfile = await profileModel.find({});
        res.render("profile" , {myProfile , locals})
    } catch (error) {
        console.log(error)
    }
}


const createProfileDashboard=async(req,res)=>{
    const locals = {
        title: 'Add New user',
        description:'Library Management System'
    }
    res.render('Profiles/createProfile',locals);
}


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
        // res.status(201).json({user : profileData})
        res.redirect('/profile');
    } catch (error) {
        res.status(404).send('something went wrong')
        console.log(error);
    }
}

// const updateProfile = async (req , res)=>{
//     const {bio} = req.body;
// try {
//     const id = req.params.id;
//     const findUser = await profileModel.findOne({_id : id});
//     if(!findUser){
//         return res.status(400).send('This user is not exist');
//     }
//     const updateUser = await profileModel.findByIdAndUpdate(id ,{
//         bio
//     });
//     res.status(200).json({updateUser});    

// } catch (error) {
//     console.log(error);
//     res.status(404).send('Something went wrong');
// }
// }

const updateProfileDetails = async(req,res)=>{
    try {
        await profileModel.findByIdAndUpdate(req.params.id,{
            fname: req.body.fname,
            lname: req.body.lname,
            about: req.body.about,
            Intrest: req.body.Intrest,
            userName: req.body.userName,
            updatedAt: Date.now()
        });

    //    await res.redirect(`/editUser/${req.params.id}`);
    res.redirect("/profile")

    } catch (error) {
        console.log(error);
    }
}



const updateProfile = async(req,res)=>{
    try {
        const user = await profileModel.findOne({ _id: req.params.id })
        
        const locals = {
            title:'Edit user Data',
            description: "Library management System",
        };
        res.render('Profiles/editProfile',{
            locals,
            user
        });
    } catch (error) {
        console.log(error);
        
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
        const num= 0
    if(req.body.userId != req.params.id){
        try {
            const user = await profileModel.findById(req.params.id);
            const currentUser = await profileModel.findById(req.body.userId);
            if(!user.follower.includes(req.body.userId)){
              const  nums = num+1;
                await user.updateOne({$push: {follower: nums}})
                await currentUser.updateOne({$push :{following :nums}})
                res.status(201).json("you have been followed this user")
                // res.redirect('/profile')
            }
            else{
                res.status(201).json("You have already followed this User")
            }
        } catch (error) {
            console.log(error);
            res.status(404).json("Something went wrong!")
        }
    }
    else{
        res.status(201).json("you can't follow yourself")

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


const viewIndivisual = async(req,res)=>{
    try {
        const allUsers = await profileModel.find({})
        const user = await profileModel.findOne({ _id: req.params.id })
        
        const locals = {
            title:'View User Profile',
            description: "Social Media Platform",
        };
        res.render('Profiles/viewProfile',{
            locals,
            user,
            allUsers
        });
    } catch (error) {
        console.log(error);
        
    }
}

const deleteProfile = async(req,res)=>{
    try {
        await profileModel.deleteOne({_id : req.params.id});
        res.redirect("/profile")
        
    } catch (error) {
        console.log(error);
    }
}

const viewAll = async(req,res)=>{
    const locals = {
        title: "All Users List",
        description: "social media"
    }
    try {
       const allProfile= await authModel.find({});
       const users = await profileModel.findOne({ _id: req.params.id })


        res.render('Profiles/viewAllProfile',{locals,allProfile,users})
    } catch (error) {
        console.log(error)
    }
}
module.exports = {CreateProfile , updateProfile , viewProfile, follower, unFollow, search, viewProfileDashboard , createProfileDashboard, viewIndivisual,updateProfileDetails,deleteProfile,viewAll}