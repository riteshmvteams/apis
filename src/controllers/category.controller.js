import { createError } from '../utils/createError.js';
import categoryModel from '../models/category.model.js';

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  if (!name?.trim()) {
    return next(createError('Name is required', 400));
  }

  if (req.userRole !== 'admin') {
    return next(createError('only Admins can create the Category', 401));
  }

  try {
    const category = await categoryModel.create({ name, user: req.userId });
    res.status(201).json({
      message: 'created Successfully',
      category
    });
  } catch (error) {
    console.log(error);
    return next(createError('Error while creating the category', 500));
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find().select(['name']);
    res.status(201).json({
      data: categories,
      count: categories.length
    });
  } catch (error) {
    console.log(error);
    return next(createError('Error while getting the categories', 500));
  }
};

export { createCategory, getAllCategories };
