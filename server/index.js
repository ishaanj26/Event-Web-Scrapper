import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import eventRouter from './routes/eventRoutes.js';


dotenv.config()
const app = express();
const render = "https://event-web-scrapper.onrender.com"


const allowedOrigins = ['https://event-web-scrapper.vercel.app','http://localhost:5173']

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))


app.use('/api/scrape-events', eventRouter)

app.listen(port, () => {
    console.log(`server is running on ${render}`);
})