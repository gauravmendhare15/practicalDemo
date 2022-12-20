const helpers = require('./../utils/helper')

module.exports = (type, schema) => (req, res, next) => {
    if (!schema || !schema.validate) {
        return res.send(helpers.error('Invalid schema', {}, 500))
    }

    console.log('validation payload: ', type, req[type])

    const { error } = schema.validate(req[type])
    if (error) return res.send(helpers.validation(helpers.JoiParseError(error)))
    next()
}