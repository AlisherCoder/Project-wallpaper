import Joi from "joi";

function brandsValidation(data) {
    const brands = Joi.object({
        name : Joi.string().required().max(30).min(3)
    })
    return brands.validate(data, {abortEarly: true});
};

export default brandsValidation;