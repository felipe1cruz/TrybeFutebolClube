import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

const userController = new UserController();

router.post('/login', (req, res, next) => userController.makeLogin(req, res, next));
router.get('/login/validate', (req, res, next) => userController.validateLogin(req, res, next));

export default router;
