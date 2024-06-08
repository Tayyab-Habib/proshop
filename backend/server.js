import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
dotenv.config()
import express from 'express'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'



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
app.use('/api/orders',orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use(notFound)
app.use(errorHandler)

const __dirname = path.resolve(); //Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.listen(port,()=>{
    console.log(`Server Listening on http://localhost:${port}`)
})
