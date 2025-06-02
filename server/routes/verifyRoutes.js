import express from 'express'
import axios from 'axios';
import * as cheerio from 'cheerio';
import { EMAIL_VERIFY_TEMPLATE } from '../emailTemplate.js';
import { transporter } from '../index.js';



const verifyRouter = express.Router()

verifyRouter.post('/', async (req, res) => {
    const { email, newOTP } = req.body;
    console.log(email, newOTP);

    try {
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Account Verification OTP',
            // text: `Your OTP is ${otp}. Verify you account using the OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", newOTP).replace("{{email}}", email)
        }
        return transporter.sendMail(mailOption)
            .then(() => res.json({ success: true, message: "OTP sent successfully" }))

    } catch (error) {
        console.error('Verification failed:', error.message);
        res.status(500).json({ error: 'Failed to verify' });
    }
});

export default verifyRouter