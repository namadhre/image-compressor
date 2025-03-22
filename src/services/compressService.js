import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import { Queue } from 'bullmq';
import CompressController from '../controllers/compressController.js';
import RequestControllor from '../controllers/requestControllor.js';
import { config } from '../config/index.js';


// const redisConnection = new Redis();
const redisConnection = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    username: config.redis.userName,
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
    
    return uniqueId;
}

export default compressService;