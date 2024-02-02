const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const SECRET_KEY = 'NOTESAPI';
const userModel = require('../models/userLogin');



const signup = async (req , res)=>{
    const {userName,email,password} =req.body;
    // const user = new userModel(req.body);
    try {
        const existingUser = await userModel.findOne({userName : userName});
        if(existingUser){
            return res.status(400).send('This user is already exist');
        }
        const hashedPassword = await bcryptjs.hash(password , 10);
        const data = await userModel.create({
            userName : userName,
            email : email,
            password : hashedPassword
        })
        const token= jwt.sign({userName : data.userName, password : data.password, id : data._id}, SECRET_KEY);
        // res.status(200).json({user : data , token : token})
        res.render("homePage")
     
        // await existingUser.save();
        // res.send("data saved;");

    } catch (error) {
        console.log(error);
        res.status(404).send('something went wrong!');
    }
}

const login = async (req , res)=>{
    const {userName} =req.body;
    try {
        const existingUser = await userModel.findOne({userName : userName});
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
        // res.status(200).json({user : existingUser , token : token})
        res.render('homePage')
    } catch (error) {
        console.log(error);
        res.status(404).send('something went Wrong!');
    }
}

module.exports = {signup , login};