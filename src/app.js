import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// security for limited json
app.use(express.json({ limit: "16kb" }))

// Data coming from url
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// for storing asset files 
app.use(express.static("public"))

// Using cookies and setting it up
app.use(cookieParser())


export default app