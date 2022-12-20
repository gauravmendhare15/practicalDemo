const mongoose = require('mongoose');
const mongoosepaginate = require("mongoose-paginate-v2")

const mockUserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    age: { type: Number },
    gender: { type: String },
}, {
    timestamps: true
})

mockUserSchema.index({ _id: 1, first_name: 1, last_name: 1, email: 1 })
mockUserSchema.plugin(mongoosepaginate)

const mockUser = mongoose.model('mockuser', mockUserSchema)
module.exports = {
    mockUser: mockUser
}

