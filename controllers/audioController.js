const helper = require("../utils/helper");
const { Audio, FileUpload } = require("../models/fileupload");



exports.getAudio = async (req, res) => {
    try {
        let audioObj = await Audio.findOne({ _id: req.params.id })
            .populate([
                { path: "audioId", select: "path orginalname" },
                { path: "imageId", select: "path originalname" },
                { path: "uploadedBy", select: "fname lnmae eamil" }
            ])
        res.send(helper.success("Successfully retrieved Audio data", audioObj))
        return

    } catch (error) {
        return res.send(helper.error("Internal Server Error", error.message));
    }
}

exports.createAudio = async (req, res) => {
    try {
        console.log(req.user)
        let checkAlreadyAvail = await Audio.findOne({ uploadedBy: req.user._id, name: req.body.name })
        if (checkAlreadyAvail) return res.send(helper.error("Name Already Exists", {}))

        let newAudio = new Audio(req.body)
        newAudio.uploadedBy = req.user._id
        await newAudio.save()
        res.send(helper.success("Successfully Audio Added", newAudio))
        return
    } catch (error) {
        res.send(helper.error("Internal Server Error"))
        return
    }
}

exports.editAudio = async (req, res) => {
    try {
        let id = req.body.id
        delete req.body.id
        let checkAlreadyAvail = await Audio.findOne({ uploadedBy: req.user._id, name: req.body.name, _id: { $ne: id } })
        if (checkAlreadyAvail) return res.send(helper.error("Name Already Exists", {}))

        let newAudio = await Audio.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
        res.send(helper.success("Successfully Audio Edited", newAudio))
        return
    } catch (error) {
        res.send(helper.error("Internal Server Error", error))
        return
    }
}



exports.deleteAudio = async (req, res) => {
    try {
        await Audio.deleteOne({ _id: req.params.id })
        res.send(helper.success("Successfully Audio Deleted", {}))
        return
    } catch (error) {
        res.send(helper.error("Internal Server Error", error))
        return
    }
}

exports.listAudio = async (req, res) => {
    try {
        let page = (req.body.page) ? req.body.page : 1;
        let limit = (req.body.limit) ? req.body.limit : 1;
        let query = {}
        if (req.body.search) query['name'] = new RegExp(req.body.search, "i")

        let options = {
            page,
            limit,
            sort: { _id: -1 },
            populate: [
                { path: "audioId", select: "path orginalname" },
                { path: "imageId", select: "path originalname" },
                { path: "uploadedBy", select: "fname lnmae eamil" }
            ]
        }

        let data = await Audio.paginate(query, options)
        res.send(helper.success("Successfully retrieved Audio List", data))
        return

    } catch (error) {
        return res.send(helper.error("Internal Server Error", error.message));
    }
}