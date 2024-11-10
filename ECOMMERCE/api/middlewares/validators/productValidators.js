const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().required(),
    category: Joi.string().min(3).max(100).required(),
    desc: Joi.string().min(3).max(500).required(),
});


module.exports = { productSchema };
