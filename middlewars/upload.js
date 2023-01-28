const multer = require("multer");
const path = require("path")

var storageData = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

function fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        console.log(file)
        cb(new Error('Invalid file type. Only jpeg and png are allowed'))
    }
}

var uploadad = multer({ storage: storageData, /**fileFilter: fileFilter*/ });

module.exports = uploadad