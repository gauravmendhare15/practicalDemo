const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const UsersShema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, required: true }

},
    { timestamps: true })

const User = mongoose.model("User", UsersShema)

module.exports = {
    User: User
}