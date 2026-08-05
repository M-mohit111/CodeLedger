const express = require('express')
require('dotenv').config();
const main = require('./config/db')
const cookieParser = require('cookie-parser');
const authrouter = require('../routes/userauth')
const reddisclient = require('./config/reddis')


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user",authrouter)
app.use("/problem",problemauth)

const connection = async ()=>{
    try{
        await Promise.all([main(),reddisclient.connect()]);
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