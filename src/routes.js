const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const employee = require('./app/controllers/employeeController')

routes.get('/employee/showAll', employee.showAll)
routes.get('/employee/:id', employee.show)


routes.post('/employee', multer.single("photos"), employee.post)
routes.put('/employee', multer.single("photos"), employee.put)
routes.delete('/employee', employee.delete)

module.exports = routes