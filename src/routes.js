const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const employee = require('./app/controllers/employeeController')
const company = require('./app/controllers/companyController')

//Employee routes
routes.get('/', employee.home)
routes.get('/employee/create', employee.create)
routes.get('/employee/showAll', employee.showAll)
routes.get('/employee/:id', employee.show)
routes.get('/employee/:id/edit', employee.edit)

routes.post('/employee', multer.single("photos"), employee.post)
routes.put('/employee', multer.single("photos"), employee.put)
routes.delete('/employee', employee.delete)

//Company(user) routes
//login
// routes.get('/company/login', sessionController.loginForm)
// routes.post('/company/login', sessionController.login)
// routes.post('/company/logout', sessionController.logOut)

// //reset/forgot password
// routes.get('/company/forgot-password', sessionController.forgotForm)
// routes.get('/company/password-reset', sessionController.resetForm)
// routes.post('/company/forgot-password', sessionController.forgot)
// routes.post('/company/password-reset', sessionController.reset)

//company register/ companyController
routes.get('/company/register', company.registerForm)
// routes.get('/company', companyController.show)
// routes.get('/company/edit', companyController.editForm)

routes.post('/company/register', company.post)
routes.put('/company/register', company.put)
routes.delete('/company/register', company.delete)

module.exports = routes