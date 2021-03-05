const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create(path, employeeId) {
        try {
            const query = `
            INSERT INTO photos (
                path,
                employee_id
            ) VALUES ($1, $2)
            RETURNING id
            `

            const values = [
                path,
                employee_id = employeeId
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error)
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