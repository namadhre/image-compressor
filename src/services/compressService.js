import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import { Queue } from 'bullmq';
import CompressController from '../controllers/compressController.js';
import RequestControllor from '../controllers/requestControllor.js';


// const redisConnection = new Redis();
const redisConnection = new Redis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null // Required for BullMQ
});
const imageQueue = new Queue('imageProcessing', { connection: redisConnection });


const compressService = {};

compressService.create = async (values) => {
    const compressController = new CompressController();
    const requestControllor = new RequestControllor();
    const uniqueId = uuidv4();
    const updatedValues = values.map(value => ({
        sno: value['S. No.'],
        productName: value['Product Name'],
        input: value['Input Image Urls'].split(','),
        uniqueId,
    }));
    await compressController.bulkCreate(updatedValues);
    await requestControllor.create({ status: 'pending', uniqueId });
    await imageQueue.add('processImages', { requestId: uniqueId });
    setTimeout(async () => {
        const waitingJobs = await imageQueue.getWaiting();
        console.log("⏳ Waiting Jobs:", waitingJobs.map(job => ({
            id: job.id,
            name: job.name,
            data: job.data
        })));
        const activeJobs = await imageQueue.getActive();
        console.log("🔄 Active Jobs (Delayed Check):", activeJobs.map(job => ({
            id: job.id,
            name: job.name,
            data: job.data
        })));
    }, 5000); // Wait 500ms before checking
    
    return uniqueId;
}

export default compressService;