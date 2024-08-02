import factModel from '../models/fact.model.js';
import { createError } from '../utils/createError.js';

const createFact = async (req, res, next) => {
  const { fact, category, tags } = req.body;
  if (!fact?.trim()) {
    next(createError('All Fields required', 400));
  }

  try {
    const createdFact = await factModel.create({
      fact,
      category,
      tags,
      user: req.userId
    });

    if (createdFact) {
      res.status(201).json({
        message: 'created',
        createdFact
      });
    } else {
      return next(createError('Error while creating the Fact', 400));
    }
  } catch (error) {
    console.log(error, 'eeee');
    return next(createError('Error while creating the Fact', 500));
  }
};

const getAllFacts = async (req, res, next) => {
  try {
    const facts = await factModel
      .find()
      .populate({ path: 'user', select: 'name email role' })
      .populate({ path: 'category', select: 'name' })
      .select('-__v');
    res.status(200).json({
      data: facts,
      count: facts?.length
    });
  } catch (error) {
    console.log(error);
    return next(createError('Error while getting the Facts', 500));
  }
};
const getUserFacts = async (req, res) => {
  res.status(200).json({
    message: 'Success'
  });
};

export { createFact, getAllFacts, getUserFacts };
