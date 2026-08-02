const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLenght:3,
        maxLength:20
    },
    lastname:{
        type:String,
        minLength:3,
        maxLength:20
    },
    emailid:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true
    },
    age:{
        type:Number,
        min:18,
        max:80
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    problemsolved:{
        type:[String]
    },
    password:{
        type:String,
        required:true
    }
},{timestamp:true})

const User = mongoose.model("user",userSchema)

module.exports = User;