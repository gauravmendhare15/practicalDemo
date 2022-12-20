const { User } = require("../models/user")
const helpers = require("../utils/helper")
const { UserRoleConstant } = require("../utils/const")
const { response } = require("express")
const { mockUser } = require("../models/mockUser")



exports.createAdmin = async (req, res) => {
    try {
        //check emailAlready exists in system 
        let checkEmail = await User.findOne({ email: req.body.email.toLowerCase() })
        if (checkEmail)
            res.send(helpers.error("Email Already Exists Please try another email", {}))

        let newAdmin = new User(req.body)
        newAdmin.role = UserRoleConstant.Admin
        newAdmin.password = helpers.bcryptHash(req.body.password)
        await newAdmin.save()
        res.send(helpers.success("Admin created successfully", newAdmin))

    } catch (error) {
        console.log(error)
        helpers.error("internal server error", error.message)
    }
}

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.userName, role: UserRoleConstant.Admin }).select("fname lname email role password").lean();
        if (!user) res.send(helpers.error("userName not existed", {}))

        let passwordCheck = await helpers.bcryptCompare(req.body.password, user.password)
        if (!passwordCheck)
            res.send(helpers.error("password is not correct", {}))

        //create a token for the user
        let payload = { ...user }
        delete payload.password

        payload.token = await helpers.JwtSign(payload)

        res.send(helpers.success("Successfully signed in", payload))
    } catch (error) {
        console.log(error)
        helpers.error("internal server error", error.message)

    }
}

exports.getUserlist = async (req, res) => {
    try {
        console.log("---------------")
        let query = {}
        if (req.body.search) {
            query = { '$or': [] }
            let fullname = req.body.search.split(' ')
            if (fullname && fullname[1]) {
                query['$or'].push({ first_name: fullname[0] })
                query['$or'].push({ last_name: fullname[1] })
            }
            else {
                query['$or'].push({ first_name: req.body.search })
                query['$or'].push({ last_name: req.body.search })
                query['$or'].push({ email: req.body.search })
            }
        }
        let options = {
            sort: { createdAt: -1 },
            page: 1,
            limit: 10
        }
        if (req.body.sort) options['sort'] = req.body.sort
        if (req.body.page) options['page'] = req.body.page
        if (req.body.limit) options['limit'] = req.body.limit

        let data = await mockUser.paginate(query, options)
        res.send(helpers.success("successfully", data))


    } catch (error) {
        console.log(error)
        res.send(helpers.error("internal server error", error.message));
    }
}
