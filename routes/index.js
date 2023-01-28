const router = require("express").Router()



const user = require("./user")
const customer = require("./customer")
const fileUploadR = require("./fileUploads");
const audiosR = require("./audio");


router.use("/user", user)
router.use("/customer", customer)
router.use("/file", fileUploadR);
router.use("/audio", audiosR)


module.exports = router