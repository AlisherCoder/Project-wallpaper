import Joi from "joi";

function categoryItemValidation(data) {
    const categoryItem = Joi.object({
        name : Joi.string().required().max(30).min(3)
    })
    return categoryItem.validate(data, {abortEarly: true});
};

export default categoryItemValidation;