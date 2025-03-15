import express from 'express';
import compressorRoute from './routers/compressorRoute.js';
import requestRouter from './routers/requestRouter.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/compress', compressorRoute);
app.use('/request', requestRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
