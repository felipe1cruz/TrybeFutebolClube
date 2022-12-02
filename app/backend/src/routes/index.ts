import { Router } from 'express';
import UserController from '../controllers/UserController';
import TeamController from '../controllers/TeamController';

const router = Router();

const userController = new UserController();
const teamController = new TeamController();

router.post('/login', (req, res, next) => userController.makeLogin(req, res, next));
router.get('/login/validate', (req, res, next) => userController.validateLogin(req, res, next));

router.get('/teams/:id', (req, res, next) => teamController.getIdTeam(req, res, next));
router.get('/teams', (req, res, next) => teamController.getAllTeams(req, res, next));
export default router;
