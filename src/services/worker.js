import { Worker } from 'bullmq';
 import Redis from 'ioredis';
 import sharp from 'sharp';
 import path from 'path';
 import { fileURLToPath } from 'url';
 import CompressController from '../controllers/compressController.js';
 import RequestControllor from '../controllers/requestControllor.js';
 import { config } from '../config/index.js';
 
 const redisConnection = new Redis({
   host: config.redis.host,
   port: config.redis.port,
   password: config.redis.password,
   username: config.redis.userName,
   maxRetriesPerRequest: null,
 });
 
 const __filename = fileURLToPath(import.meta.url);  
 const __dirname = path.dirname(__filename);
 
 const worker = new Worker('imageProcessing', async (job) => {
     try {
         const { requestId } = job.data;
         console.log(`Processing images for request: ${requestId}`);
         const compressController = new CompressController();
         const requestControllor = new RequestControllor();
 
         const products = await compressController.findAllByUniqueId(requestId);
 
         for (const product of products) {
             const inputUrls = product.input;
             const outputUrls = [];
 
             for (const url of inputUrls) {
                 const outputPath = path.join(__dirname, `../../compressed/${Date.now()}-compressed.jpg`);
 
                 const response = await fetch(url);
                 const buffer = await response.arrayBuffer();
                 await sharp(Buffer.from(buffer)).resize({ width: 500 }).toFile(outputPath);
 
                 outputUrls.push(outputPath);
             }
 
             product.output = outputUrls;
             await product.save();
         }
 
         await requestControllor.updateByUniqueId({ status: 'completed'}, requestId);
 
         console.log(`Processing completed for request: ${requestId}`);
     } catch (error) {
         console.error("Error in worker job:", error);
     }
 }, { connection: redisConnection });
 
 console.log("Worker started...");
 
 export default worker;