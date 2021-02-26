const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create(data) {
        try {
            const query = `
            INSERT INTO employees (
                name,
                rg,
                cpf,
                phone,
                email,
                birth
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING ID
            `

            const values = [
                data.name,
                data.rg,
                data.cpf,
                data.phone,
                data.email,
                data.birth
            ]

            return db.query(query, values)

        } catch (error) {
            console.error(error)
        }
    },

    update(data) {
        try {
            const query = `
            UPDATE employees SET
                name=($1),
                rg=($2),
                cpf=($3),
                phone=($4),
                email=($5),
                birth=($6)
            WHERE id = $7
            `

            const values = [
                data.name,
                data.rg,
                data.cpf,
                data.phone,
                data.email,
                data.birth,
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
                SELECT employees.*, photos.path
                FROM employees, photos, employee_photos
                WHERE employees.id = employee_photos.employee_id
                AND photos.id = employee_photos.photo_id
                AND employees.id = $1
            `, [id])
            
        } catch (error) {
            console.error(error)
        }
    },

    findAll() {
        try {
            return db.query(`
                SELECT employees.*, photos.path
                FROM employees, photos, employee_photos
                WHERE employees.id = employee_photos.employee_id
                AND photos.id = employee_photos.photo_id
            `)
        } catch (error) {
            console.error(error)
        }
    }
}