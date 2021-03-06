const db = require('../../config/db')
const { hash } = require('bcryptjs')

module.exports = {
    async create (data) {
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

            const passwordHash = await hash(data.password, 7)

            const values = [
                data.name,
                data.cnpj.replace(/\D/g,""),
                data.email,
                passwordHash
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error);
        }
    },

    async update(data) {
        try {
            const query = `
            UPDATE company SET
                name=($1),
                cnpj=($2),
                email=($3),
                password=($4)
            WHERE id = $5    
            `

            const passwordHash = await hash(data.password, 7)

            const values = [
                data.name,
                data.cnpj.replace(/\D/g,""),
                data.email,
                passwordHash,
                data.id
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error);
        }
    },

    resetToken(token, tokenExpires, id){
        try {
            const query = `
            UPDATE company SET
                reset_token=($1),
                reset_token_expires=($2)
            WHERE id = $3    
            `
            const values = [
                reset_token = token,
                reset_token_expires = tokenExpires,
                id
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error);
        }
    },

    async updatePassword(newPassword, id) {
        try {
            const query = `
            UPDATE company SET
                password=($1)
            WHERE id = $2    
            `
            const passwordHash = await hash(newPassword, 7)

            const values = [
                passwordHash,
                id
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
    },

    find(id) {
        try {
            return db.query(`SELECT * FROM company WHERE id = $1`, [id])
        } catch (error) {
            console.error(error);
        }
    },

    async verifyIfExists(filters){
        let query = `SELECT * FROM company`

        Object.keys(filters).map(key => {
            query = `${query}
            ${key}
            `
            Object.keys(filters[key]).map(field => {
                query = `${query}${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)
        return results.rows[0]
    }
}