const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

connectDB()
const app = express()

//cái này phải dùng trước route api
app.use(express.json())
app.use(express.urlencoded({extended :false}))
 
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes')) 

//cái này phải dùng sau route api
app.use(errorHandler)

app.listen(port, () => console.log(`Server start on port ${port}`))