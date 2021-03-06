const Company = require('../models/companyModel');
const {formatCpfCnpj} = require('../../lib/utils')
module.exports = {
    registerForm(req, res) {
        try {
            return res.render('company/companyCreate')
        } catch (error) {
            console.error(error);
        }
    },

    async editForm(req, res) {
        try {
            let results = await Company.find(req.params.id)
            let company = results.rows[0]
            //console.log(req.params.id)
            return res.render('company/companyEdit', {company})
        } catch (error) {
            console.error(error);
        }
    },

    async show (req, res) {
        let results = await Company.find(req.params.id)
        let company = results.rows[0]
        company.cnpj = formatCpfCnpj(company.cnpj)
        
        return res.render('company/companyShow', {company})
    },

    async post(req, res) {
        try {
            //Verifica se todos os campos estão preenchidos
            const keys = Object.keys(req.body)
            for(key of keys) {
                if (req.body[key] =='') {
                    return res.render('company/companyCreate', {
                        error: 'Preencha todos os campos!'
                    })
                }
            }

            //Verifica se a empresa ja está cadastrada
            let {email, cnpj} = req.body
            cnpj = cnpj.replace(/\D/g,"")
            
            const user = await Company.verifyIfExists({
                where:{email},
                or:{cnpj}
            })

            if(user) {
                return res.render('company/companyCreate', {
                    error: 'Usuário já cadastrado!'
                })
            }
        
            let company = await Company.create(req.body)
            let companyId = company.rows[0].id
            
            req.session.companyId = companyId
            
            return res.redirect(`/company/${companyId}`)
            
        } catch (error) {
            console.error(error);
        }
    },

    async put(req, res) {
        try {
            const keys = Object.keys(req.body)
            for(key of keys) {
                if (req.body[key] =='') {
                    return res.send('Por favor, preencha todos os campos!')
                }
            }

            await Company.update(req.body)
            
            return res.redirect(`/company/${req.body.id}`)
        } catch (error) {
            console.error(error);
        }
    },

    async delete(req, res) {
        try {
            req.session.destroy()
            await Company.delete(req.body.id)
            return res.redirect('/')
        } catch (error) {
            console.error(error);
        }
    }
}