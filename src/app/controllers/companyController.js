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
            await Company.create(req.body)
            
            res.json('company created!')
        } catch (error) {
            console.error(error);
        }
    },

    async put(req, res) {
        try {
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