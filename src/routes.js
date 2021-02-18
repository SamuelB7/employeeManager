const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => res.json('Server ok!'))

module.exports = routes