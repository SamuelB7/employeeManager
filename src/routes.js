const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const employee = require('./app/controllers/employeeController')
const company = require('./app/controllers/companyController')
const session = require('./app/controllers/sessionController')
const {onlyUsers, logged} = require('./app/middlewares/session')

//Employee routes
routes.get('/', logged, employee.home)
routes.get('/employee/create', onlyUsers, employee.create)
routes.get('/employee/showAll', onlyUsers, employee.showAll)
routes.get('/employee/:id', onlyUsers, employee.show)
routes.get('/employee/:id/edit', onlyUsers, employee.edit)

routes.post('/employee', multer.single("photos"), employee.post)
routes.put('/employee', multer.single("photos"), employee.put)
routes.delete('/employee', employee.delete)

//Company(user) routes
//login
routes.get('/company/login', session.loginForm)
routes.post('/company/login', session.login)
routes.post('/company/logout', session.logout)

//reset/forgot password
// routes.get('/company/forgot-password', sessionController.forgotForm)
// routes.get('/company/password-reset', sessionController.resetForm)
// routes.post('/company/forgot-password', sessionController.forgot)
// routes.post('/company/password-reset', sessionController.reset)

//company register
routes.get('/company/register', company.registerForm)
routes.get('/company/:id', company.show)
routes.get('/company/:id/edit', company.editForm)

routes.post('/company/register', company.post)
routes.put('/company/register', company.put)
routes.delete('/company', company.delete)

module.exports = routes