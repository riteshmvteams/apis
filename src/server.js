import mongoose from "mongoose";

import app from "./app.js";
import { config } from "./config/config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connected Successfully");
    });

    mongoose.connection.on("error", () => {
      console.log(`Error while connecting to the Mongodb`);
      process.exit(1);
    });

    await mongoose.connect(config.mongo_uri);
  } catch (error) {
    console.log(`Error while connecting to the Mongodb`);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  const port = config.port;
  app.listen(port, () => {
    console.log(`server is listening i port: ${port}`);
  });
};

startServer();
