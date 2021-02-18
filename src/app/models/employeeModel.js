const db = require('../../config/db')

module.exports = {
    create(data, photoId) {
        try {
            const query = `
            INSERT INTO employees (
                name,
                rg,
                cpf,
                phone,
                email,
                birth,
                photo_id
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
                photo_id = photoId
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
                rg($2),
                cpf($3),
                phone($4),
                email($5),
                photo_id($6)
            WHERE id = $7
            `

            const values = [
                data.name,
                data.rg,
                data.cpf,
                data.phone,
                data.email,
                data.photo,
                data.id
            ]

            return db.query(query, values)

        } catch (error) {
            console.error(error)
        }
    },

    delete(id) {
        try {
            return db.query(`DELETE FROM employees WHERE id = $1`, [id])
        } catch (error) {
            console.error(error)
        }
    },

    findOne (id) {
        try {
            return db.query(`
                SELECT * FROM employees 
                LEFT JOIN photos on employees.id = photos.id
                WHERE employees.id = $1
            `, [id])
            
        } catch (error) {
            console.error(error)
        }
    },

    findAll() {
        try {
            return db.query(`
                SELECT * FROM employees 
                LEFT JOIN photos on employees.id = photos.id
            `)
        } catch (error) {
            console.error(error)
        }
    }
}