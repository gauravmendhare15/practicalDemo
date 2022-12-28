const router = require("express").Router()
const { Customer } = require("../models/customers")
const validate = require("../middlewars/validate")
const customerSchema = require("../validators/customer.validator")
const customerController = require("../controllers/customerController")


/**
 * create cutomer data into our system
 * fname:string
 * lname:string
 * email:string
 * city:string
 * company:string
 */
router.post("/", validate("body", customerSchema.createCustomer), customerController.addCustomer)


/**
 * get customer data by id's id passing through paras
 * id:string
 */
router.get("/by/:id", validate("params", customerSchema.custId), customerController.getCustomer)


/**
 * get the customers list
 * page:number
 * search:string
 * sort: object   eg:{age:1||-1}  // 1:ascending 2:descending
 * limit:number
 */
router.post("/list", validate("body", customerSchema.getCustomers), customerController.getCustomerList)

router.get("/city", customerController.getCustomerByCity)

module.exports = router