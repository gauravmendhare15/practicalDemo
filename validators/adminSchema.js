const Joi = require('joi')
const CONST = require('../utils/const')

module.exports = {
    // * /admin/user
    createAdmin: Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),

    login: Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required()

    }),

    getUsers: Joi.object({
        page: Joi.number().required(),
        search: Joi.string(),
        sort: Joi.object(),
        limit: Joi.number()
    })
}