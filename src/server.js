import app from './app.js';
import { config } from './config/config.js';
import connectDB from './config/db.js';

const startServer = async () => {
  await connectDB();
  const port = config.port;
  app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
  });
};

startServer();
