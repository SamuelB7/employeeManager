const db = require('../../config/db')

module.exports ={
    async verifyEmail(email) {
        let results = await db.query (`SELECT * FROM company WHERE email = $1`, [email])
        return results.rows[0]
    }
}