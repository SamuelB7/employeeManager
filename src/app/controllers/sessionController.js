const session = require('../models/sessionModel')
const {compare} = require('bcryptjs')

module.exports = {
    async login(req, res) {
        //verificar se usuário está cadastrado
        let user = await session.verifyEmail(req.body.email)
        if(!user) {
            return res.render('company/login', {
                error: 'Usuário não encontrado!'
            })
        }
        //verificar se senha está correta
        const verifyPassword = await compare(req.body.password,user.password)
        if(!verifyPassword) {
            return res.render('company/login', {
                error: 'Senha incorreta!'
            })
        }
        //colocar no req.session
        req.session.companyId = user.id
        
        return res.redirect(`/company/${user.id}`)
    },

    logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    },

    loginForm(req, res) {
        res.render('company/login')
    },

    forgotForm(req, res) {
        return res.render('company/retrivePassword')
    },

    retrivePassword(req, res) {
        //fazer um token

        //tempo de duração do token

        //enviar um email com o link para recuperar senha

        //informar que o email foi enviado
    }
}