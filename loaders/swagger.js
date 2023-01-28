module.exports = function (app) {
    const expressSwagger = require('express-swagger-generator')(app)

    let options = {
        swaggerDefinition: {
            info: {
                description: 'Api for demo project',
                title: 'DEMO',
                version: '1.0.0',
            },
            host: process.env.serverHost,
            basePath: '/api',
            produces: [
                "application/json"
            ],
            schemes: ['http'],//
            securityDefinitions: {
                token: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: __dirname, //app absolute path
        files: ['./../routes/*.js'] //Path to the API handle folder
    }
    expressSwagger(options)

}



