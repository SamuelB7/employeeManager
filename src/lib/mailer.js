const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "80d5e6ec09a8e7",
      pass: "9743958036a728"
    }
});

module.exports = transport