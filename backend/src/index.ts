import express from 'express';
import { connectToDatabase } from './database/index.js';
import { FoodRouter } from './routes/food.router.js';

await connectToDatabase();

const app = express();

app.use(cors())

app.use(express.json());

app.use('/foods', FoodRouter);
app.use('/category')

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})