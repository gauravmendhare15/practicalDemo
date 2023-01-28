const router = require("express").Router();
const uploadad = require("../middlewars/upload")
const auth = require("../middlewars/auth")
const fileController = require("../controllers/fileUpload")


/**
 * Upload Single Image for System
 * @route POST /file/upload/{docType}
 * @consumes multipart/form-data
 * @param {file} file.formData
 * @param {number} docType.path.required - document type constant 
 * 1:for image
 * 2: for audio
 * 3: video
 * 4: doc file
 * @group FileUpload - File Upload operation
 * @returns {object} 200 - file path object
 *      
 * @returns {Error}  Error - Unexpected error
 * @security token
 */
router.post("/upload/:docType", uploadad.single("file"), fileController.fileUpload)

module.exports = router

