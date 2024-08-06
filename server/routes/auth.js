// routes/authRoutes.js
import express from 'express';
import { register, login } from '../controler/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;

