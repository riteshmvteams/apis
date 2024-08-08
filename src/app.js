import express from 'express';
import cors from 'cors';
import cron from 'node-cron';

import { createError } from './utils/createError.js';
import globalErrorHandler from './middleware/globalErrorHanlder.js';
import userRouter from './routes/user.route.js';
import factRouter from './routes/fact.route.js';
import categoryRouter from './routes/category.route.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// test route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to apis'
  });
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/facts', factRouter);
app.use('/api/v1/categories', categoryRouter);

const someTask = () => {
  console.log('cron Run');
};

cron.schedule('0 * * * *', someTask);

app.use('*', (req, res, next) => {
  next(createError('This Route Not Available', 404));
});

app.use(globalErrorHandler);

export default app;
