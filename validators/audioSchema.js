const Joi = require('joi')
const CONST = require('../utils/const')

module.exports = {
    // * /admin/user
    createAudio: Joi.object({
        name: Joi.string().required(),
        imageId: Joi.string().required(),
        audioId: Joi.string().required(),
        description: Joi.string().required()
    }),

    audioId: Joi.object({
        id: Joi.string().required()
    }),

    listAudio: Joi.object({
        page: Joi.number().required(),
        search: Joi.string().optional().allow(""),
        limit: Joi.number()
    }),
    editAudio: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        imageId: Joi.string().required(),
        audioId: Joi.string().required(),
        description: Joi.string().required()
    }),
}