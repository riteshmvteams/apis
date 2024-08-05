import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userModel from '../models/user.model.js';
import { createError } from '../utils/createError.js';
import { registerValidation } from '../utils/validators/user.js';
import { config } from '../config/config.js';

const generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, config.jwt_secret, {
    expiresIn: '1d'
  });

  return token;
};

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return next(createError('Please Enter all the required details', 400));
  }

  const errors = registerValidation(name, email, password);
  const errorValues = Object.values(errors);
  if (errorValues?.length > 0) {
    return next(createError(`Validation Error: ${errorValues[0]}`, 404));
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return next(createError(`User Already exists with this email`, 404));
    }
  } catch (error) {
    return next(createError(`Error While finding the user`, 500));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({
      message: 'User Register Successfully',
      token
    });
  } catch (error) {
    return next(createError(`Error While Creating the user`));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email?.trim() || !password?.trim()) {
    return next(createError('All Fields are required', 400));
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(createError('Invalid Credentials', 400));
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return next(createError('Invalid Credentials', 400));
    }

    const token = generateToken(user._id, user.role);
    res.status(201).json({
      message: 'Login Successfull',
      token
    });
  } catch (error) {
    return next(createError('Error while Login user', 500));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find().select(['-password', '-__v']);
    res.status(200).json({
      data: users,
      count: users.length
    });
  } catch (error) {
    return next(createError('Error while fetching the users', 500));
  }
};

const singleUserDetail = async (req, res) => {
  try {
    const user = await userModel
      .findById(req?.userId)
      .select(['name', 'email', 'role', 'createdAt']);

    if (!user) {
      return next(createError('User not Found', 400));
    }

    res.status(200).json(user);
  } catch (error) {
    return next(createError('Error while finding the user', 500));
  }
};

export { registerUser, loginUser, getUsers, singleUserDetail };
