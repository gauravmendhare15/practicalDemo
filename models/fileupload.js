const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")


const fileSchema = new mongoose.Schema({
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number },
    docType: { type: Number }  // 1:image 2:audio 3:video etc

}, { timeseries: true, strict: false })

const audioSchema = new mongoose.Schema({
    uploadedBy: { type: mongoose.Types.ObjectId, ref: "User" },
    name: { type: String },
    imageId: { type: mongoose.Types.ObjectId, ref: "FileUpload" },
    audioId: { type: mongoose.Types.ObjectId, ref: "FileUpload" },
    description: { type: String }
})

audioSchema.plugin(mongoosePaginate)

const FileUpload = mongoose.model("FileUpload", fileSchema)
const Audio = mongoose.model("Audio", audioSchema)
module.exports = {
    FileUpload,
    Audio
}