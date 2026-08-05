const validator = require('validator')

const validate = (details)=>{
    const mandatoryFields = ["firstname","emailid","password"];

    const isallow = mandatoryFields.every((k)=>{
        return Object.keys(details).includes(k);
    })

    if(!isallow){
        throw new Error("field is missing")
    }
    if(!validator.isEmail(details.emailid)){
        throw new Error("invalid email")
    }

    if(!validator.isStrongPassword(details.password)){
        throw new Error("invalid password")
    }

    return true;
}

module.exports = validate