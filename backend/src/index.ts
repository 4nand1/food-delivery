import express from 'express'
import { connectToDatabase } from './database/index.js'
import { AuthRouter, CategoryRouter, FoodRouter } from './routes/index.js'

import cors from 'cors'



await  connectToDatabase()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/foods',FoodRouter)
app.use('/categories',CategoryRouter)
app.use('/auth',AuthRouter)

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`)
})



