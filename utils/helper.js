const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




exports.JoiParseError = (error) => {
    return error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
}
exports.success = (message = '', data = {}, code = 200) => {
    return {
        error: false,
        message,
        data,
        code
    }
}

exports.error = (message = '', data = {}, code = 500) => {
    return {
        error: true,
        message,
        data,
        code
    }
}

exports.validation = (data = {}) => {
    return {
        error: true,
        message: 'Bad Request',
        code: 400,
        data
    }
}

exports.JwtSign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

exports.bcryptHash = (password) => {
    return bcrypt.hashSync(password, 10)
}

exports.bcryptCompare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}