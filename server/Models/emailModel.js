const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Transporter configuration error:', error);
    } else {
        console.log('Transporter is ready to send emails');
    }
});

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
};

const sendVerificationEmail = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'School Email Verification',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <div style="background-color: #f4f4f4; padding: 20px;">
                <h1 style="color: #84cc16;">School Verification</h1>
                <p>Dear Student,</p>
                <p>Thank you for registering with our school. Please use the verification code below to complete your registration:</p>
                <div style="margin: 20px 0; font-size: 24px; font-weight: bold; color: #84cc16;">
                    ${code}
                </div>
                <p>If you did not request this verification, please ignore this email.</p>
                <p>Best Regards,</p>
                <p>Your School Team</p>
            </div>
        </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return { valid: true, response: info.response };
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        return { valid: false, error: error.message };
    }
};

const sendRegistrationEmail = async (student_name, student_ID) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: "kingber2017@gmail.com",
        subject: 'New Student Registration',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2C3E50;">New Student Registration</h2>
            <p>Dear Admin,</p>
            <p>We have a new student registration with the following details:</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Student Name</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${student_name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Student ID</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${student_ID}</td>
                </tr>
            </table>
            <p>Best Regards,</p>
            <p>Your School Team</p>
        </div>
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return { valid: true, response: info.response };
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        return { valid: false, error: error.message };
    }
};

const sendContactEmail = async (contact_name, contact_phone, message) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: "kingbero2017@gmail.com",
        subject: 'New Contact',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2C3E50;">New Contact</h2>
            <p>Dear Admin,</p>
            <p>We have a new contact with the following details:</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Contact Name</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${contact_name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Contact Phone</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${contact_phone}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Message</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
                </tr>
            </table>
            <p>Best Regards,</p>
            <p>Your School Team</p>
        </div >
    `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return { valid: true, response: info.response };
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        return { valid: false, error: error.message };
    }
};

module.exports = { sendVerificationEmail, sendRegistrationEmail, sendContactEmail, generateVerificationCode };
