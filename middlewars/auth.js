const jwt = require("jsonwebtoken");
const helper = require('../utils/helper')


exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if (!token) return res.send(helper.error('Access denied. Token not found.', {}, 401))
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.send(helper.error('Access denied.', {}, 401))
            res.user = decoded;
            next();
        })

    } catch (error) {
        console.log("error", error)
        res.send(helper.error("Internal Server Error"))
    }
};