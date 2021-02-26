const db = require('../../config/db')

module.exports = {
    create(employeeId, photoId) {
        try {
            const query = `
            INSERT INTO employee_photos(
               employee_id,
               photo_id 
            ) VALUES ($1, $2)
            `

            const values = [
                employee_id = employeeId,
                photo_id = photoId
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(error);
        }
    }
}