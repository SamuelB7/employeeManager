const express = require('express')
const routes = require('./routes')

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(routes)

server.listen(7000, () => {
    console.log('server ok!')
})