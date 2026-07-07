
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
const app = express()

app.use("/uploads", express.static("uploads"));
app.use(express.json())
app.use(cors())
app.use('/api', userRoute)
app.use('/api' , productRoute)



connectDB()

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})