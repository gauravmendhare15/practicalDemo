const router = require('express').Router()
const validate = require("../middlewars/validate")
const adminSchema = require("../validators/adminSchema")
const AdminController = require("../controllers/admin")
const { auth } = require("../middlewars/auth")
const UserController = require("../controllers/userController")




/**
 * create a new admin role
 * fname:string
 * lname:string
 * email:string
 * password:string
 */
router.post("/create/Admin", validate("body", adminSchema.createAdmin), AdminController.createAdmin)

/**
 * login a admin
 * userName:string
 * password:string
 */
router.post("/login/Admin", validate("body", adminSchema.login), AdminController.login);

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