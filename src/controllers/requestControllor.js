import Request from '../models/Request.js';

class RequestControllor {
    constructor() {
      this.model = Request;
    }

    create(value) {
        return this.model.create(value);
    }

    findOneByUniqueId(uniqueId) {
      const filter = {
        where: {
          uniqueId,
        }
      }
      return this.model.findOne(filter);
    }

    updateByUniqueId(values, uniqueId) {
    // await Request.update({ status: 'completed' }, { where: { id: requestId } });
    const filter = {
      where: {
        uniqueId,
      }
    };
    return this.model.update(values, filter);
  }
    
}

export default RequestControllor;