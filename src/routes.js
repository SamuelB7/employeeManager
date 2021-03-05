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

routes.post('/employee', onlyUsers, multer.single("photos"), employee.post)
routes.put('/employee', onlyUsers, multer.single("photos"), employee.put)
routes.delete('/employee', onlyUsers, employee.delete)

//login/logout
routes.get('/company/login', session.loginForm)
routes.post('/company/login', session.login)
routes.post('/company/logout', session.logout)

//reset/forgot password
routes.get('/company/forgot-password', session.forgotForm)
// routes.get('/company/password-reset', session.resetForm)
routes.post('/company/forgot-password', session.retrivePassword)
// routes.post('/company/password-reset', session.reset)

//company routes(users)
routes.get('/company/register', company.registerForm)
routes.get('/company/:id', onlyUsers, company.show)
routes.get('/company/:id/edit', onlyUsers, company.editForm)

routes.post('/company/register', company.post)
routes.put('/company/register', onlyUsers, company.put)
routes.delete('/company', onlyUsers, company.delete)

module.exports = routes