import express from 'express';

import {
  getUsers,
  loginUser,
  registerUser,
  singleUserDetail
} from '../controllers/user.controller.js';
import authenticate, { permissionTo } from '../middleware/authenticate.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', authenticate, permissionTo('admin'), getUsers);
userRouter.get('/detail', authenticate, singleUserDetail);

export default userRouter;
