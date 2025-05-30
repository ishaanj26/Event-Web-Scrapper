import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import eventRouter from './routes/eventRoutes.js';


dotenv.config()
const app = express();
const port = 8080

// mongoose.connect(`${process.env.MONGO}`).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((err) => {
//     console.log(err)
// });

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']

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