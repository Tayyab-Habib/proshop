// const express =require('express')
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
dotenv.config()
import express from 'express'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'



const port = process.env.PORT

connectDB() //Connect to MongoDB
const app = express()


//Body parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// cookie parser middleware
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("API is running...")
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server Listening on http://localhost:${port}`)
})