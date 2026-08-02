const User = require("../src/models/user")
const validator = require('validator')

const validate = async (details)=>{
    
    const mandatoryfeild = ["firstname","emailid","password"];

    const isallow = mandatoryfeild.every((k)=>{
        Object.keys(details).includes(k);
    })

    if(!isallow){
        throw new Error("field is missing")
    }
    // don't forgot to install validator at this point
    if(!validator.isEmail(details.emailid)){
        throw new Error("invalid email")
    }

    if(!validator.isStrongPassword(details.password)){
        throw new Error("invalid email")
    }

}

module.exports = validate