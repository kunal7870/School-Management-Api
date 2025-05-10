import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import schoolRoutes from './routes/schoolRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001

app.use(cors());
app.use(express.json())

//routes
app.use('/',schoolRoutes)

app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`)
})