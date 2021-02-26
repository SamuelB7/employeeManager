const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create(path) {
        try {
            const query = `
            INSERT INTO photos (
                path
            ) VALUES ($1)
            RETURNING id
            `

            const values = [
                path
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error)
        }
    },

    find(id) {
        try {
            return db.query(`SELECT * FROM photos WHERE employee_id =$1`, [id])
        } catch (error) {
            console.error(error);
        }
    },

    upadate(path, id) {
        try {
            const query = `
            UPDATE photos SET
                path=($1)
            WHERE id = $2
            `

            const values = [
                path,
                id
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error);
        }
    }

    
}