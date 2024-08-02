import express from 'express';

import {
  createFact,
  getAllFacts,
  getUserFacts
} from '../controllers/fact.controller.js';
import authenticate from '../middleware/authenticate.js';

const factRouter = express.Router();

factRouter.post('/', authenticate, createFact);
factRouter.get('/', getAllFacts);
factRouter.get('/user', authenticate, getUserFacts);

export default factRouter;
