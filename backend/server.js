// const express =require('express')
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
import express from 'express'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'



const port = process.env.PORT

connectDB() //Connect to MongoDB
const app = express()
app.get('/',(req,res)=>{
    res.send("API is running...")
})

app.use('/api/products',productRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server Listening on http://localhost:${port}`)
})