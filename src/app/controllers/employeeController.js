const Employee = require('../models/employeeModel')
const Photo = require('../models/photoModel')
const fs = require('fs')


module.exports = {
    async post(req, res) {
        try {
            
            let employee = await Employee.create(req.body)
            let employeeId = employee.rows[0].id

            let photo = await Photo.create(req.file.path, employeeId)
            
            return res.json(employee)
        } catch (error) {
            console.error(error);
        }
    },

    async put(req, res) {
        try {

            let employee = await Employee.update(req.body)   

            if (req.file) {
                
                let oldPhoto = await Photo.find(req.body.id)
                let oldPath = oldPhoto.rows[0].path
                fs.unlinkSync(oldPath)

                let photoId = oldPhoto.rows[0].id
                let photo =  await Photo.upadate(req.file.path, photoId)
            }

            return res.json(employee)
            

        } catch (error) {
            console.error(error);
        }
    },

    async delete(req, res) {
        try {
            
            //console.log(req.body)
            await Employee.delete(req.body.id)

            return res.json('Employee Deleted!')
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
    },

    async showAll(req, res) {
        try {
            let results = await Employee.findAll()
            let employees = results.rows

            return res.json(employees)
        } catch (error) {
            console.error(error);
        }
    }
}