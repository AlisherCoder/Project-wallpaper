import Joi from "joi"

const resetpwdValid = Joi.object({
    newPassword: Joi.string().min(8).required(),
    phoneNumber: Joi.string().min(13).max(13).required()
})

export default resetpwdValid
