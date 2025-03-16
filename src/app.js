// Now other imports will have access to env variables
import dotenv from 'dotenv';
import express from 'express';
import compressorRoute from './routers/compressorRoute.js';
import requestRouter from './routers/requestRouter.js';

dotenv.config();

console.log('process.env', process.env);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/compress', compressorRoute);
app.use('/request', requestRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
