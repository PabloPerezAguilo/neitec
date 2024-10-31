import express from 'express'
import { admin, generator } from '../../core/middlewares.js'
import { updateTransaction, createTransaction, validateTransaction } from './controller.js';

const router = express.Router();

router.post('/', generator(createTransaction, ['body', 'token']));
router.patch('/:id/validation', admin, generator(validateTransaction, ['params.id', 'body', 'token']));
router.patch('/:id/approval', generator(updateTransaction, ['params.id', 'body', 'token']));

export default router;
