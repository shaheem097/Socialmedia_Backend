"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
// Define your SMTP settings
const sendMail = (email, uniqueString) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
            user: 'cosmobic2251@gmail.com',
            pass: 'Cosmobic@123', // Replace with your password
        },
    });
    // Create a transporter with your SMTP settings
    const mailOptions = {
        from: 'COSMOBIC',
        to: email,
        subject: 'Email Confirmation',
        html: `This is your email verification code ${uniqueString}`, // Use ${} to interpolate the uniqueString
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Message sent successfully', info.response);
        }
    });
};
exports.default = sendMail;
