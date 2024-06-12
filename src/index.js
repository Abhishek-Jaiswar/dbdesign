import dotenv from 'dotenv'
import connectToDb from "./db/index.js";
import app from './app.js';


dotenv.config({
    path: "./env"
})

connectToDb()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running at port: http://localhost:${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Connection failed...!", error);
})




/*
import express from 'express'

const app = express()

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (e) => {
            console.log("Error: ", e);
            throw e
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: http://localhost:${process.env.PORT}`);
        })

    } catch (error) {
        console.log("An Error occured while connectiong: ", error);
    }
})()*/