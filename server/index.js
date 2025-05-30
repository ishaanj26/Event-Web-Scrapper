import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import eventRouter from './routes/eventRoutes.js';


dotenv.config()
const app = express();
const port = 8080


const allowedOrigins = ['https://event-web-scrapper.vercel.app/']

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))


app.get('/', (req, res) => {
    res.send('Sunshine here we at')
})


app.use('/api/scrape-events', eventRouter)

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})