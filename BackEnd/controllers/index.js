const httpStatusCodes = require('../utils/constant')
const taskControllers = require('./tasks')
const userControllers = require('./users')

function handleNotFound(request, response) {
    response.statusCode = httpStatusCodes.NOT_FOUND
    response.end('Not found')
}

module.exports = {
    handleNotFound, 
    taskControllers,
    userControllers
}