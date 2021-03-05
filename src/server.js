const express = require('express')
const routes = require('./routes')
const nunjucks = require('nunjucks')
const methodOverride = require('method-override')
const session = require('./config/session')

const server = express()

server.use(session)
//deixa o req.session disponível disponivel no njk
server.use((req, res, next) =>{
    res.locals.session = req.session
    next()
})

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(7000, () => {
    console.log('server ok!')
})