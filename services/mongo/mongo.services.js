import { BaseService } from "../services.js";
export class MongoService extends BaseService {
  constructor(model) {
    super(model);
  }
  async findAll(query = {}) {
    const { filter = {}, sort, limit, skip } = query;
    let q = this.model.find(filter);
    if (sort) {
      q = q.sort(sort);
    }
    if (limit) {
      q = q.limit(limit);
    }
    if (skip) {
      q = q.skip(skip);
    }
    return q;
  }
  async findById(id, options = {}) {
    return this.model.findById(id, options);
  }
  async create(data) {
    return this.model.create(data);
  }
  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}