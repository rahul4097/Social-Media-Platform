const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const SECRET_KEY = 'NOTESAPI';
const userModel = require('../models/userLogin');


const logInPage = async(req,res) =>{
    const locals = {
        title: 'Social Media Login',
        description:'Social Media Platform'
    }
    try {
        const myUser = await userModel.find({});
        res.render("startingPage" , {myUser , locals})
    } catch (error) {
        console.log(error)
    }
}

const showSignup=async(req,res)=>{
    const locals = {
        title: 'Add New user',
        description:'Library Management System'
    }
    res.render('users/signup',locals);
}

const signup = async (req , res)=>{
    const {name,userName,email,password,phnNumber} =req.body;
    // const user = new userModel(req.body);
    try {
        const existingUser = await userModel.findOne({userName : userName});
        if(existingUser){
            // return res.status(400).send('This user is already exist');
            return alert({message : "This user is already exist"})
        }
        const hashedPassword = await bcryptjs.hash(password , 10);
        const data = await userModel.create({
            name : name,
            userName : userName,
            email : email,
            password : hashedPassword,
            phnNumber : phnNumber
        })
        const token= jwt.sign({userName : data.userName, password : data.password, id : data._id}, SECRET_KEY);
        // res.status(200).json({user : data , token : token})
        res.redirect('/');
     
        // await existingUser.save();
        // res.send("data saved;");

    } catch (error) {
        console.log(error);
        res.status(404).send('something went wrong!' );
    }
}

const showlogin=async(req,res)=>{
    const locals = {
        title: 'User Login',
        description:'Library Management System'
    }
    res.render('users/login',locals);
}


const login = async (req , res)=>{
    const {email} =req.body;
    try {

        // if(req.body.email == userModel.email && req.body.password == userModel.password)
        // req.session.user = req.body.email
        const existingUser = await userModel.findOne({email : email});
        // console.log(existingUser)
        if(!existingUser){
            return res.status(400).send('User not found!');
        }
        const matchPassword = await bcryptjs.compare(req.body.password, existingUser.password);
        // console.log(matchPassword)
        if(!matchPassword){
            return res.status(400).send('Invalid password!');
        }
        const token= jwt.sign({userName : existingUser.userName,id : existingUser._id}, SECRET_KEY);
        res.status(200).json({user : existingUser , token : token})
        res.redirect('/users')
        // res.end("login Succssfull")
    } catch (error) {
        console.log(error);
        res.status(404).send('something went Wrong!');
    }
}

const show = async(req,res) =>{
    const locals = {
        title: 'Social Media',
        description:'library Management System'
    }
    try {
        const myUser = await userModel.find({});
        res.render("homePage" , {myUser , locals})
    } catch (error) {
        console.log(error)
    }
}

const viewIndivisual = async(req,res)=>{
    try {
        const user = await userModel.findOne({ _id: req.params.id })
        
        const locals = {
            title:'View User Data',
            description: "Social Media Platform",
        };
        res.render('users/viewUsers',{
            locals,
            user
        });
    } catch (error) {
        console.log(error);
        
    }
}

const userEdit = async(req,res)=>{
    try {
        const user = await userModel.findOne({ _id: req.params.id })
        
        const locals = {
            title:'Edit user Data',
            description: "Library management System",
        };
        res.render('users/editUser',{
            locals,
            user
        });
    } catch (error) {
        console.log(error);
        
    }
}

const editDetails = async(req,res)=>{
    try {
        await userModel.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            phnNumber: req.body.phnNumber,
            email: req.body.email,
            userName: req.body.userName,
            updatedAt: Date.now()
        });

    //    await res.redirect(`/editUser/${req.params.id}`);
    res.redirect("/")

    } catch (error) {
        console.log(error);
    }
}


const deleteUser = async(req,res)=>{
    try {
        await userModel.deleteOne({_id : req.params.id});

        // await userModel.findOneAndDelete(req.params._id);
        res.redirect("/")
        
    } catch (error) {
        console.log(error);
    }
}

const searchUser = async(req,res)=>{

    const locals = {
        title:'Search user Data',
        description: "Library management System",
    };
    
    try {
        let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const searchUser = await userModel.find({
        $or:[
            { name: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        ]
    });

    res.render("searchUser",{
        searchUser,
        locals
    })

        
    } catch (error) {
        console.log(error);
    }
}
module.exports = {signup , show, showSignup,showlogin , viewIndivisual, userEdit, editDetails, deleteUser, searchUser,logInPage};