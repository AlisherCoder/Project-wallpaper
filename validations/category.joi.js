import Joi from "joi";

function categoryValidation(data) {
    const category = Joi.object({
        name : Joi.string().required().max(30).min(3)
    })
    return category.validate(data, {abortEarly: true});
};

export default categoryValidation;