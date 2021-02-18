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

    
}