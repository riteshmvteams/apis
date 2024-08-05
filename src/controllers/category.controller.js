import { createError } from '../utils/createError.js';
import categoryModel from '../models/category.model.js';

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  if (!name?.trim()) {
    return next(createError('Name is required', 400));
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

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return next(createError('Kindly provide the category id', 400));
  }

  const { name } = req.body;
  if (!name?.trim()) {
    return next(createError('Name is required', 400));
  }
  try {
    const updated = await categoryModel.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      message: 'Category updated Successfully',
      category: updated
    });
  } catch (error) {
    console.log(error);
    return next(createError('Error while Updating the categories', 500));
  }
};

const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return next(createError('Kindly provide the category id', 400));
  }

  try {
    await categoryModel.deleteOne({ _id: categoryId });

    res.status(200).json({
      message: 'Deleted Successfull'
    });
  } catch (error) {
    console.log(error);
    return next(createError('Error while Updating the categories', 500));
  }
};

export { createCategory, getAllCategories, updateCategory, deleteCategory };
