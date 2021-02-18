const Employee = require('../models/employeeModel')
const Photo = require('../models/photoModel')


module.exports = {
    async post(req, res) {
        try {
            
            let results = await Photo.create(req.file.path)
            let photoId = results.rows[0].id

            let employee = await Employee.create(req.body, photoId)
            
            return res.json(employee)
        } catch (error) {
            console.error(error);
        }
    },

    async show(req, res) {
        try {
            let results = await Employee.findOne(req.params.id)
            let employee = results.rows[0]

            if(!employee) return res.json('Employee not found')

            return res.json(employee)
        } catch (error) {
            console.error(error);
        }
    }
}