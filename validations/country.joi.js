import Joi from "joi";

function countryValidation(data) {
    const country = Joi.object({
        name : Joi.string().required().max(30).min(3)
    })
    return country.validate(data, {abortEarly: true});
};

export default countryValidation; 