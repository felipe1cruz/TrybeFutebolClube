import { Router } from 'express';
import UserController from '../controllers/UserController';
import TeamController from '../controllers/TeamController';
import MatchController from '../controllers/MatchController';

const router = Router();

const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();

router.post('/login', (req, res, next) => userController.makeLogin(req, res, next));
router.get('/login/validate', (req, res, next) => userController.validateLogin(req, res, next));

router.get('/teams/:id', (req, res, next) => teamController.getIdTeam(req, res, next));
router.get('/teams', (req, res, next) => teamController.getAllTeams(req, res, next));

router.patch(
  '/matches/:id/finish',
  (req, res, next) => matchController.changeProgressMatch(req, res, next),
);
router.patch('/matches/:id', (req, res, next) => matchController.changeMatch(req, res, next));
router.get('/matches', (req, res, next) => matchController.getAllMatches(req, res, next));
router.post('/matches', (req, res, next) => matchController.InsertMatch(req, res, next));

export default router;
