const express = require('express')
const connect = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
require('dotenv').config()
const port = process.env.port


connect()

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true // Allow cookies and headers
}))

app.use(cookieParser())
app.use(express.json())
app.use('/api',userRoutes)

app.options('*', cors()); // Allow preflight requests for all routes




app.listen(port,()=>{
    console.log(`We are listening at ${port}`)
})