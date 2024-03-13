const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
// const bodyParser = require('body-parser');
// const session = require('express-session')
// const {v4:uuidv4} = require("uuid")
require('./database/db');
const path = require('path')
const ejs = require('ejs')

const userAuthRouter = require('../routes/authenticationRoute')
const profileRouter = require('../routes/profileRoute')
const postRouter = require('../routes/postRoute');
const port = process.env.PORT || 3000;

app.use(express.json())
// app.use(bodyParser.json)
app.use(methodOverride('_method'))
// app.use(bodyParser.urlencoded({extended : true}))

app.set('view engine', "ejs")
app.use(express.urlencoded({extended : true}))

app.use(expressLayouts);
app.set('layout','./layouts/main');


const body = path.join(__dirname,"../templates")
// app.use(session({
//     secret: uuidv4(),
//     resave: false,
//     saveUninitialized:true
// }))

app.set('views',body)


app.use('/', userAuthRouter)
app.use('/profile', profileRouter)
app.use('/post', postRouter)

app.listen(port , ()=>{
    console.log(`The server has been connected on port ${port}`)
})