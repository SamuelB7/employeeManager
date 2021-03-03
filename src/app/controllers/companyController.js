const Company = require('../models/companyModel');

module.exports = {
    registerForm(req, res) {
        try {
            res.render('company/companyCreate')
        } catch (error) {
            console.error(error);
        }
    },

    async post(req, res) {
        try {
            const keys = Object.keys(req.body)
            for(key of keys) {
                if (req.body[key] =='') {
                    return res.send('Por favor, preencha todos os campos!')
                }
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