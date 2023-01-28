require('dotenv').config()
const express = require('express')
const app = express()
const ConnectDB = require('./loaders/db')

if (process.env.PROTOCOL === 'https') {
    const fs = require('fs')
    const httpsOptions = {
        key: fs.readFileSync(process.env.CERT_KEY),
        cert: fs.readFileSync(process.env.CERT_PATH)
    }

    console.log('https Server Started')
    var server = require('https').createServer(httpsOptions, app)
} else {
    console.log('http Server Started')
    var server = require('http').createServer(app)
}

app.get('/health', (req, res) => {
    res.send('Success')
})

// Routes
require('./loaders/express')(app)
require("./loaders/swagger")(app)

// Plugins
// require('./loaders/swagger')(app)
// require('./loaders/logger')

// Start the server
Promise.all([ConnectDB()])
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT} 🚀`)
        })
    })
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
