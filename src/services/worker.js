import { Worker } from 'bullmq';
import Redis from 'ioredis';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import CompressController from '../controllers/compressController.js';
import RequestControllor from '../controllers/requestControllor.js';

const redisConnection = new Redis({
  host: '127.0.0.1',
  port: 6379,
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
          console.log(product.toJSON());
            const inputUrls = product.input;  
            const outputUrls = [];

            for (const url of inputUrls) {
                const outputPath = path.join(__dirname, `../${Date.now()}-compressed.jpg`);

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
