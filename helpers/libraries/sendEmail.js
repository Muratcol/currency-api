const nodemailer = require('nodemailer');
const { lock } = require('../../routers');

const sendEmail = async(mailOptions) => {
    let transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        auth : {
            user: process.env.SMTP_GMAIL_USER, // Your gmail username
            pass: process.env.SMTP_GMAIL_PASS // password
        }
    });
    console.log(process.env.SMTP_GMAIL_USER, process.env.SMTP_GMAIL_PASS)
    let info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.messageId}`)
};

module.exports = sendEmail;
