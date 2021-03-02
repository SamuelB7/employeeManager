const db = require('../../config/db')

module.exports = {
    create (data) {
        try {
            const query = `
            INSERT INTO company (
                name,
                cnpj,
                email,
                password
            ) VALUES ($1, $2, $3, $4)
            RETURNING ID
            `

            const values = [
                data.name,
                data.cnpj,
                data.email,
                data.password
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error);
        }
    },

    update(data) {
        try {
            const query = `
            UPDATE company SET
                name=($1),
                cnpj=($2),
                email=($3),
                password=($4)
            WHERE id = $5    
            `

            const values = [
                data.name,
                data.cnpj,
                data.email,
                data.password,
                data.id
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error);
        }
    },

    delete(id) {
        try {
            return db.query(`DELETE FROM company WHERE id = $1`, [id])
        } catch (error) {
            console.error(error);
        }
    }
}