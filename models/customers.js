const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const customerSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: false },
    email: { type: String, required: true },
    company: { type: String, required: true },
    city: { type: String, required: true },

}, { timestamps: true })

customerSchema.plugin(mongoosePaginate)
const Customer = mongoose.model("Customer", customerSchema)

module.exports = {
    Customer: Customer,
}