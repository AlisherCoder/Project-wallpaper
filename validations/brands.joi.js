import Joi from "joi";

function brandsValidation(data) {
    const brands = Joi.object({
        name_uz : Joi.string().required().max(300).min(3),
        name_ru : Joi.string().required().max(300).min(3),
        image: Joi.string()
    })
    return brands.validate(data, {abortEarly: true});
};

export default brandsValidation;