const express = require('express')
require('dotenv').config();
const main = require('./config/db')
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth')
const problemRouter = require('./routes/problemcreator')
const redisclient = require('./config/redis')


const app = express();

app.use(express.json());
app.use(cookieParser());

// it is for user register and login also for admin login
app.use('/user', authRouter)
// this is for admin to create udpate delete all this stuff on problem in database
app.use('/problem', problemRouter)

const connection = async ()=>{
    try{
        await Promise.all([main(),redisclient.connect()]);
        console.log("db connected")
        app.listen(process.env.PORT,()=>{
            console.log("server is active at port : " + process.env.PORT);
        })
    }
    catch(err){
        console.log(err);
    }
}

connection();