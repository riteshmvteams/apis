import jwt from 'jsonwebtoken';

import { createError } from '../utils/createError.js';
import { config } from '../config/config.js';

const verifyToken = (token) => {
  try {
    const jwtPayload = jwt.verify(token, config.jwt_secret);

    if (jwtPayload) {
      return {
        userId: jwtPayload.id,
        userRole: jwtPayload.role
      };
    }

    return null;
  } catch (err) {
    return err;
  }
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next(createError('Authorization header missing', 401));
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(createError('Token is Missing', 401));
  }

  const userDetail = verifyToken(token);
  if (!userDetail?.userId || !userDetail.userRole) {
    return next(createError('Invalid or Expired Token', 401));
  }

  req.userId = userDetail.userId;
  req.userRole = userDetail.userRole;

  next();
};

export const permissionTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      next(createError('You do not have permission for this Route', 401));
    }

    next();
  };
};

export default authenticate;
