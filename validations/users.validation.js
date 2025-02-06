import Joi from "joi"

const userValidation = Joi.object({
    firstName: Joi.string().min(2).max(32).required(),
    lastName: Joi.string().min(2).max(32).required(),
    password: Joi.string().min(8).max(255).required(),
    phoneNumber: Joi.string().min(13).max(13).required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    role: Joi.string(),
})

const userPatchValid = Joi.object({
    firstName: Joi.string().min(2).max(32),
    lastName: Joi.string().min(2).max(32),
    password: Joi.string().min(8).max(255),
    phoneNumber: Joi.string().min(13).max(13),
    email: Joi.string(),
    address: Joi.string(),
    role: Joi.string(),
})

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\+998\d{9}$/;
    if (phoneRegex.test(phoneNumber)) {
        return true;  
    } else {
        return false;  
    }
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export { userValidation, userPatchValid, validatePhoneNumber, validateEmail } 

