import mongoose from 'mongoose';
import { config } from './config.js';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('DB connected Successfully');
    });

    mongoose.connection.on('error', () => {
      console.log(`Error while connecting to the Mongodb`);
      process.exit(1);
    });

    await mongoose.connect(config.mongo_uri);
  } catch (error) {
    console.log(`Error while connecting to the Mongodb`);
    process.exit(1);
  }
};

export default connectDB;
