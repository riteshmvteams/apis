import express from 'express';

import {
  createCategory,
  getAllCategories
} from '../controllers/category.controller.js';
import authenticate from '../middleware/authenticate.js';

const categoryRouter = express.Router();

categoryRouter.post('/', authenticate, createCategory);
categoryRouter.get('/', authenticate, getAllCategories);

export default categoryRouter;
