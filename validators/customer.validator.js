const Joi = require('joi')

module.exports = {

    createCustomer: Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email().required(),
        company: Joi.string().required(),
        city: Joi.string().required()
    }),

    custId: Joi.object({
        id: Joi.string().required(),
    }),

    getCustomers: Joi.object({
        page: Joi.number().required(),
        search: Joi.string().optional().allow(""),
        sort: Joi.object(),
        limit: Joi.number()
    })
}