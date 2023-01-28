const router = require('express').Router()
const validate = require("../middlewars/validate")
const adminSchema = require("../validators/adminSchema")
const AdminController = require("../controllers/admin")
const { auth } = require("../middlewars/auth")
const UserController = require("../controllers/userController")




/**
 * @typedef UserCreateModel
 * @property {string} fname.required
 * @property {string} lname.required
 * @property {string} email.required
 * @property {string} password.required
 */


/**
 * User Login
 * @route POST /user/create
 * @param {UserCreateModel.model} data.body.required - user login object
 * @group User - User operation
 * @returns {object} 200 -
 *      Return Jwt Token in key result.token
 *
 * @returns {Error}  Error - Unexpected error
 */
router.post("/create", validate("body", adminSchema.createAdmin), AdminController.createAdmin)


/**
 * @typedef UserLogin
 * @property {string} userName.required
 * @property {string} password.required
 */


/**
 * User Login
 * @route POST /user/login
 * @param {UserLogin.model} data.body.required - user login object
 * @group User - User operation
 * @returns {object} 200 -
 *      Return Jwt Token in key result.token
 *
 * @returns {Error}  Error - Unexpected error
 */

router.post("/login", validate("body", adminSchema.login), AdminController.login);

/**
 * get the user list
 * page:number
 * search:string
 * sort: object   eg:{age:1||-1}  // 1:ascending 2:descending
 * limit:number
 */
router.post("/getUserList", auth, validate("body", adminSchema.getUsers), AdminController.getUserlist)

router.post("/add/mock/data", auth, UserController.mockDataAdd)
module.exports = router