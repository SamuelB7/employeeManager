const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create(data, companyId) {
        try {
            const query = `
            INSERT INTO employees (
                name,
                rg,
                cpf,
                phone,
                email,
                birth,
                company_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING ID
            `

            const values = [
                data.name,
                data.rg,
                data.cpf,
                data.phone,
                data.email,
                data.birth,
                company_id = companyId
            ]

            return db.query(query, values)

        } catch (error) {
            console.error(error)
        }
    },

    update(data, companyId) {
        try {
            const query = `
            UPDATE employees SET
                name=($1),
                rg=($2),
                cpf=($3),
                phone=($4),
                email=($5),
                birth=($6),
                company_id=($7)
            WHERE id = $8
            `

            const values = [
                data.name,
                data.rg,
                data.cpf,
                data.phone,
                data.email,
                data.birth,
                company_id = companyId,
                data.id
            ]

            return db.query(query, values)

        } catch (error) {
            console.error(error)
        }
    },

    async delete(id) {
        try {
            /* let photoPath = await db.query(`SELECT * FROM photos WHERE employee_id = $1`, [id])
            let results = photoPath.rows[0]
            console.log(photoPath) */
            //fs.unlinkSync(photoPath)

            return db.query(`DELETE FROM employees WHERE id = $1`, [id])
        } catch (error) {
            console.error(error)
        }
    },

    findOne (id) {
        try {
            return db.query(`
                SELECT employees.*, photos.path, photos.id as photoId
                FROM employees, photos
                WHERE employees.id = photos.employee_id
                AND employees.id = $1
            `, [id])
            
        } catch (error) {
            console.error(error)
        }
    },

    findAll(companyId) {
        try {
            return db.query(`
                SELECT employees.*, photos.path
                FROM employees, photos
                WHERE employees.id = photos.employee_id
                AND employees.company_id = $1
            `, [companyId])
        } catch (error) {
            console.error(error)
        }
    }
}