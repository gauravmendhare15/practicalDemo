const mongoose = require("mongoose")
const { Customer } = require("../models/customers")
const helpers = require("../utils/helper")

exports.addCustomer = async (req, res) => {
    try {
        let checkEmail = await Customer.findOne({ email: req.body.email.toLowerCase() })
        if (checkEmail) return res.send(helpers.error("Email Already Exists Please try another email", {}))

        let custObj = new Customer(req.body)
        await custObj.save()

        res.send(helpers.success("Customer created successfully", custObj))
        return
    } catch (error) {
        console.log(error.message)
        res.send(helpers.error("Internal Server Error", {}, 500))

    }
}

exports.getCustomer = async (req, res) => {
    try {
        let custObj = await Customer.findOne({ _id: req.params.id })
        if (!custObj) return res.send(helpers.error("No record Found", {}))

        res.send(helpers.success("Customer Retrieved Successfully", custObj))
        return
    } catch (error) {
        console.log(error)
        res.send(helpers.error("Internal Server Error", {}, 500))
    }
}

exports.getCustomerList = async (req, res) => {
    try {
        console.log("---------------")
        let query = {}
        if (req.body.search) {
            query = { '$or': [] }
            let fullname = req.body.search.split(' ')
            if (fullname && fullname[1]) {
                query['$or'].push({ fname:new RegExp(fullname[0], 'i') })
                query['$or'].push({ lname: new RegExp(fullname[1], 'i') })
            }
            else {
                query['$or'].push({ fname: new RegExp(req.body.search, 'i')  })
                query['$or'].push({ lname: new RegExp(req.body.search, 'i')  })
                query['$or'].push({ city: new RegExp(req.body.search, 'i')  })
            }
        }
        let options = {
            sort: { createdAt: -1 },
            page: 1,
            limit: 10
        }

        if (req.body.page) options['page'] = req.body.page
        if (req.body.limit) options['limit'] = req.body.limit

        let data = await Customer.paginate(query, options)
        res.send(helpers.success("Data Retrieved Successsfully", data))
        return
    } catch (error) {
        console.log(error)
        res.send(helpers.error("internal server error", error.message));
    }
}

exports.getCustomerByCity = async (req, res) => {
    try {
        let query = {}
        let aggregatePipeline = [
            {
                $group: {
                    _id: "$city",
                    data: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    city: 1,
                    cutomerCount: { $size: "$data" },
                    data: 1
                }
            }
        ]
        let data = await Customer.aggregate(aggregatePipeline)
        res.send(helpers.success("Customer Retrived By City Wise Successsfully", data))
        return

    } catch (error) {
        console.log(error)
        res.send(helpers.error("internal server error", error.message));
    }
}