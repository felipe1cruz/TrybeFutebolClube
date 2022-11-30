import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.post('/login', (req, res, next) => userController.makeLogin(req, res, next));

export default router;
