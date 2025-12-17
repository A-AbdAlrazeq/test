import dotenv from "dotenv";
import UserMongo from "../models/user.model.js";
import PostMongo from "../models/post.model.js";
import UserPostgres from "../models/user.postgress.model.js";
import PostPostgres from "../models/post.postgress.model.js";
import { MongoService } from "./mongo/mongo.services.js";
import { PostgresService } from "./postgres/postgres.services.js";

dotenv.config();

const DB_CLIENT = process.env.DB_CLIENT || 'mongo';

function createService(mongoModel, postgresModel) {
  if (DB_CLIENT === 'postgres') {
    return new PostgresService(postgresModel);
  }
  return new MongoService(mongoModel);
}

export const userService = createService(UserMongo, UserPostgres);
export const postService = createService(PostMongo, PostPostgres);
