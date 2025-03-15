import { Parser } from 'json2csv';
import RequestControllor from '../controllers/requestControllor.js';
import CompressController from '../controllers/compressController.js';

const requestService = {};

requestService.getStatus = async (uniqueId) => {
    const compressController = new CompressController();
    const requestControllor = new RequestControllor();
    const request = await requestControllor.findOneByUniqueId(uniqueId);

    if (!request) {
      throw new Error('Request not found');
    }
    const products = await compressController.findAllByUniqueId(uniqueId);

    const csvFields = ['S. No.', 'Product Name', 'Input Image Urls', 'Output Image Urls'];
    const csvData = products.map(product => ({
        'S. No.': product.sno,
        'Product Name': product.name,
        'Input Image Urls': product.input.join(','),
        'Output Image Urls': product.output.length ? product.output.join(',') : 'Processing...',
    }));
    const parser = new Parser({ fields: csvFields });
    const csv = parser.parse(csvData);    
    return { csv };
};

export default requestService;
