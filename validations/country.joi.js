import Joi from "joi";

function countriesValidation(data) {
    const country = Joi.object({
        name_uz : Joi.string().required().max(300).min(3),
        name_ru : Joi.string().required().max(300).min(3)
    })
    return countries.validate(data, {abortEarly: true});
};

export default countriesValidation; 