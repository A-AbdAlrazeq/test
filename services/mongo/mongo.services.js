import { BaseService } from "../services";
export class MongoService extends BaseService {
  constructor(model) {
    super(model);
  }
  async findAll(options = {}) {
    return this.model.find(options);
  }
    async findById(id, options = {}) {
    return this.model.findById(id, options);
  }
}