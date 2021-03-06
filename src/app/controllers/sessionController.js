const session = require('../models/sessionModel')
const {compare} = require('bcryptjs')
const crypto = require('crypto')
const Company = require('../models/companyModel')
const mailer = require('../../lib/mailer')

module.exports = {
    async login(req, res) {
        try {
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
        } catch (error) {
            console.error(error);
        }
    },

    logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    },

    loginForm(req, res) {
        return res.render('company/login')
    },

    forgotForm(req, res) {
        return res.render('company/retrivePassword')
    },

    async retrivePassword(req, res) {
        try {
            let user = await session.verifyEmail(req.body.email)
            if(!user) res.render('company/retrivePassword', {
                error: 'Email não localizado!'
            })
            //fazer um token
            const token = crypto.randomBytes(20).toString('hex')
            //tempo de duração do token
            let now = new Date()
            now = now.setHours(now.getHours() + 1)

            await Company.resetToken(token, now, user.id)
            //enviar um email com o link para recuperar senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@employeemanager.com.br',
                subject: 'Recuperação de senha',
                html: `
                    <p>Clique no link abaixo para recuperar a sua senha</p>
                    <p> <a href="http://localhost:7000/company/password-reset?token=${token}" target="_blank">
                            RECUPERAR SENHA
                        <a/> 
                    </p>
                `,
            })
            //informar que o email foi enviado
            return res.render('company/login', {
                greenAlert: 'Email enviado com sucesso!'
            })
        } catch (error) {
            console.error(error);
        }
    },

    resetPasswordForm(req, res) {
        return res.render('company/resetPassword')
    },

    async resetPassword(req, res) {
        try {
            const {email, password, passwordRepeat} = req.body
            
            //Lógica para pegar o token
            let urlStr = req.headers.referer
            let url = new URL(urlStr)
            let token = new URLSearchParams(url.search).get('token')
            //console.log(token)
            
            let user = await session.verifyEmail(email)
            
            if(!user) return res.render('company/resetPassword', {
                token,
                error: 'Usuário não encontrado!'
            })

            if(password != passwordRepeat) return res.render('company/resetPassword', {
                token,
                error: 'As senha não confere!'
            }) 
            
            
            if(token != user.reset_token) return res.render('company/resetPassword', {
                error: 'Token inválido! Solicite uma nova recuperação de senha'
            })
            

            let now = new Date()
            now = now.setHours(now.getHours())
            if(now > user.reset_token_expires) return res.render('company/resetPassword', {
                token,
                error: 'Token expirado! Solicite uma nova recuperação de senha'
            })

            await Company.updatePassword(password, user.id)

            return res.render('company/login', {
                greenAlert: 'Senha atualizada com sucesso! Faça login novamente'
            })
            
        } catch (error) {
            console.error(error);
        }
    }
}