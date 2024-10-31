import express from 'express'
import { createUser, login } from './controller.js'
import { admin, auth, generator } from '../../core/middlewares.js';

const router = express.Router();

// Asumimos que solo los admins pueden crear usuarios (del tipo que sea)
router.post('/', auth, admin,  generator(createUser, ['body']));
router.post('/login', generator(login, ['body']));


export default router;
