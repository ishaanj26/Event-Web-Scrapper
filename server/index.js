import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import eventRouter from './routes/eventRoutes.js';
import verifyRouter from './routes/verifyRoutes.js';
import nodemailer from 'nodemailer'


dotenv.config()

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user:"83660b001@smtp-brevo.com",
        pass: "c15tWF94z7YLO0ZB"
    }
})

const app = express();
const render = "https://event-web-scrapper.onrender.com"
const port = 8080;

const allowedOrigins = ['https://event-web-scrapper.vercel.app','http://localhost:5173']

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))


app.use('/api/scrape-events', eventRouter)
app.use('/api/verify-email', verifyRouter)

app.listen(port, () => {
    console.log(`server is running on ${port}  `);
})