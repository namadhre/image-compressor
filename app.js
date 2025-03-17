import { config } from './src/config/index.js';
import db from './src/models/Model.js';
import dotenv from 'dotenv';
import express from 'express';
import compressorRoute from './src/routers/compressorRoute.js';
import requestRouter from './src/routers/requestRouter.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/compress', compressorRoute);
app.use('/request', requestRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
