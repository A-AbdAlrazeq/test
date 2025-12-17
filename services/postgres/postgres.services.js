import { BaseService } from "../services.js";

export class PostgresService extends BaseService {
  constructor(model) {
    super(model);
  }

  async findAll(query = {}) {
    const { filter = {}, sort, limit, skip } = query;
    const options = {};
    if (filter && Object.keys(filter).length) {
      options.where = filter;
    }
    if (sort) {
      options.order = Object.entries(sort).map(([field, direction]) => [
        field,
        direction === -1 || direction === 'desc' || direction === 'DESC' ? 'DESC' : 'ASC',
      ]);
    }
    if (limit) {
      options.limit = limit;
    }
    if (skip) {
      options.offset = skip;
    }
    return this.model.findAll(options);
  }

  async findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    const [count, rows] = await this.model.update(data, {
      where: { id },
      returning: true,
    });
    if (!count) {
      return null;
    }
    return rows[0];
  }

  async delete(id) {
    const count = await this.model.destroy({
      where: { id },
    });
    return count > 0;
  }
}
