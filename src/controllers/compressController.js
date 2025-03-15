import ImageCompressor from '../models/ImageCompressor.js';

class CompressController {
    constructor() {
      this.model = ImageCompressor;
    }

    bulkCreate(values) {
        return this.model.bulkCreate(values);
    }

    findAllByUniqueId(uniqueId) {
      const filter = {
        where: {
          uniqueId,
        }
      };
      return this.model.findAll(filter);
    };  
}

export default CompressController;