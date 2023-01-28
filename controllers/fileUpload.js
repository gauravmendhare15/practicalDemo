const helper = require("../utils/helper")
const { FileUpload } = require("../models/fileupload")
const _ = require("lodash")


exports.fileUpload = async (req, res) => {
    try {
        console.log(req.file)
        let fileData = _.pick(req.file, ['fieldname',
            'originalname',
            'mimetype',
            'destination',
            'filename',
            'path',
            'size'])

        fileData.docType = req.params.docType

        fileData = new FileUpload(fileData)
        await fileData.save()
        res.send(helper.success("successfully uploaded file", fileData))
        return
    } catch (error) {
        console.log(error)
        return res.send(helper.error("Internal Server error"))

    }
}