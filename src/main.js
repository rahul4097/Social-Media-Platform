const express = require('express');
const app = express();
require('./database/db');
const path = require('path')
const ejs = require('ejs')

const userAuthRouter = require('../routes/authenticationRoute')
const profileRouter = require('../routes/profileRoute')
const postRouter = require('../routes/postRoute')
const userModel = require('../models/userLogin')
const port = process.env.PORT || 3000;

app.use(express.json())
app.set('view engine', "ejs")
app.use(express.urlencoded({extended : true}))

const body = path.join(__dirname,"../templates/views")

app.set('views',body)

app.get('/templates/views/homePage.ejs',(req , res)=>{
    res.render('homePage')
})
app.get('/templates/views/signup.ejs',(req , res)=>{
    res.render('signup')
})
app.get('/templates/views/login.ejs',(req , res)=>{
    res.render('login')
})
app.get('/templates/views/profile.ejs',(req , res)=>{
    res.render('profile')
})


app.use('/users', userAuthRouter)
app.use('/users', profileRouter)
app.use('/users', postRouter)

app.listen(port , ()=>{
    console.log(`The server has been connected on port ${port}`)
})