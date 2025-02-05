import Joi from "joi";

function categoriesValidation(data) {
    const categories = Joi.object({
        name_ru : Joi.string().required().max(300).min(3),
        name_uz : Joi.string().required().max(300).min(3),
        image: Joi.string()

    })
    return categories.validate(data, {abortEarly: true});
};

export default categoriesValidation;