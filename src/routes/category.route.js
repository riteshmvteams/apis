import express from 'express';

import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';
import authenticate, { permissionTo } from '../middleware/authenticate.js';

const categoryRouter = express.Router();

categoryRouter.post('/', authenticate, permissionTo('admin'), createCategory);
categoryRouter.get('/', getAllCategories);
categoryRouter.patch('/', authenticate, permissionTo('admin'), updateCategory);
categoryRouter.delete(
  '/:categoryId',
  authenticate,
  permissionTo('admin'),
  deleteCategory
);

export default categoryRouter;
