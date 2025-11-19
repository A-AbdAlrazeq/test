
export class BaseService {
constructor(model) {
  // prevent direct creation of instances of BaseService
  if (new.target === BaseService) {
    throw new TypeError("Cannot construct BaseService instances directly");
  }

  if (!model) {
    throw new Error('Model is required to initialize the service');
  }
  this.model = model;
}

async findAll(options = {}) {
 throw new Error("Method 'findAll()' must be implemented.");
}
//find by id
async findById(id, options = {}) {
  throw new Error("Method 'findById()' must be implemented.");
}
async create(data) {
throw new Error("Method 'create()' must be implemented.");
}
async update(id, data) {
 throw new Error("Method 'update()' must be implemented.");
}
async delete(id) {
  throw new Error("Method 'delete()' must be implemented.");
}
}