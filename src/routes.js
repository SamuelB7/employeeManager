const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const employee = require('./app/controllers/employeeController')

routes.get('/', (req, res) => res.json('Server ok!'))
routes.get('/employee/:id', employee.show)

routes.post('/employee', multer.single("photos"), employee.post)

module.exports = routes