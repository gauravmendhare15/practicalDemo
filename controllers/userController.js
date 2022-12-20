const { response } = require("express")
const { mockUser } = require("../models/mockUser")
const helpers = require("../utils/helper")
const data = require("../mockdata.json")

exports.mockDataAdd = async (req, res) => {
    try {
        console.log(data[0])
        if (data && data.length >= 1000) {
            let x = Math.floor(data.length / 100)
            let start = 0, end = 99
            for (let i = 0; i < x - 1; i++) {
                let tempData = data.slice(start, end)
                await mockUser.insertMany(tempData)
                start += 100
                end += 100
            }
        } else {
            await mockUser.insertMany(data)
        }
        res.send(helpers.success("Successfully Added mock data"))
        return
    } catch (error) {
        console.log(error)
        res.send(helpers.error("Internal error: " + error))

    }
}