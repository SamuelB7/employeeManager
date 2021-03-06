const Employee = require('../models/employeeModel')
const Photo = require('../models/photoModel')
const fs = require('fs')
const {date} = require('../../lib/utils')


module.exports = {
    home (req, res) {
        try {
            res.render('home')
        } catch (error) {
            console.error(error);
        }
    },

    create(req, res) {
        try {
            res.render('create')
        } catch (error) {
            console.error(error);
        }
    },

    async edit(req, res) {
        try {
            let results = await Employee.findOne(req.params.id)
            let employee = results.rows[0]
            
            if(!employee) return res.json('Employee not found')
            let photoPath = `${req.protocol}://${req.headers.host}${employee.path.replace("public", "")}`
            
            employee.birth = date(employee.birth).iso
            //return res.json(employee)
            return res.render('edit', {employee, photoPath})
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

            let companyId = req.session.companyId
            //console.log(companyId)
            let employee = await Employee.create(req.body, companyId)
            let employeeId = employee.rows[0].id

            let photo = await Photo.create(req.file.path, employeeId)

            return res.redirect(`/employee/${employeeId}`)
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
            let companyId = req.session.companyId
            let employee = await Employee.update(req.body, companyId)   

            if (req.file) {
                
                let oldPhoto = await Employee.findOne(req.body.id)
                let oldPath = oldPhoto.rows[0].path
                fs.unlinkSync(oldPath)

                let photo_id = oldPhoto.rows[0].photoid
                //console.log(oldPhoto.rows)
                let photo =  await Photo.upadate(req.file.path, photo_id)
            }

            return res.redirect(`/employee/${req.body.id}`)
            

        } catch (error) {
            console.error(error);
        }
    },

    async delete(req, res) {
        try {
            let path = req.body.path
            fs.unlinkSync(path)
            await Employee.delete(req.body.id)

            return res.redirect('/employee/showAll')
        } catch (error) {
            console.error(error);
        }
    },

    async show(req, res) {
        try {
            let results = await Employee.findOne(req.params.id)
            let employee = results.rows[0]
            
            if(!employee) return res.json('Employee not found')
            let photoPath = `${req.protocol}://${req.headers.host}${employee.path.replace("public", "")}`
            
            employee.birth = date(employee.birth).format
            employee.created_at = date(employee.created_at).format
            //return res.json(employee)
            return res.render('show', {employee, photoPath})
        } catch (error) {
            console.error(error);
        }
    },

    async showAll(req, res) {
        try {
            let companyId = req.session.companyId

            let results = await Employee.findAll(companyId)
            let employees = results.rows

            //return res.json(employees)
            return res.render('list', {employees})
        } catch (error) {
            console.error(error);
        }
    }
}