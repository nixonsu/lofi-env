/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let connection;
let mongoServer: MongoMemoryServer;

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  connection = await mongoose.connect(mongoServer.getUri());
};

const close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

const clear = async () => {
  const { collections } = mongoose.connection;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
export default { connect, close, clear };
