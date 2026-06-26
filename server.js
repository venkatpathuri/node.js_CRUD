const express=require('express')
const dotEnv=require('dotenv')
const router = require('./Routes/userRoutes')
const dbConnect = require('./db.js/dbConnect')
const errorHandler = require('./middlewares/errorMiddleware')

dotEnv.config()

const app=express()

app.use(express.json())

dbConnect();



app.use('/api',router)


app.use(errorHandler)

const PORT=process.env.port || 3000
app.listen(PORT,()=>{
  console.log('server running at port 3000')
})