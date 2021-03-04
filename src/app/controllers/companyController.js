const Company = require('../models/companyModel');

module.exports = {
    registerForm(req, res) {
        try {
            res.render('company/companyCreate')
        } catch (error) {
            console.error(error);
        }
    },

    async editForm(req, res) {
        try {
            let results = await Company.find(req.params.id)
            let company = results.rows[0]
            //console.log(req.params.id)
            res.render('company/companyEdit', {company})
        } catch (error) {
            console.error(error);
        }
    },

    async post(req, res) {
        try {
            //Verifica se todos os campos estão preenchidos
            const keys = Object.keys(req.body)
            for(key of keys) {
                if (req.body[key] =='') {
                    return res.send('Por favor, preencha todos os campos!')
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
            
            res.json('company created!')
            
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
            
            res.json('company updated!')
        } catch (error) {
            console.error(error);
        }
    },

    async delete(req, res) {
        try {
            await Company.delete(req.body.id)
            res.json('company deleted!')
        } catch (error) {
            console.error(error);
        }
    }
}